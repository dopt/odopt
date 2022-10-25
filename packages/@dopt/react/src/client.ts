import { Intentions, Blocks, Block, BlockIdentifier } from './types';
import { getBlockDefaultState, updatedBlocksAsMap } from './utils';

import { errorHandler } from './error-handler';
import { Logger } from '@dopt/logger';

const blockRequests: { [identifier: string]: Promise<Block> } = {};
export const URL_PREFIX = process.env.URL_PREFIX;

export async function client({
  url,
  apiKey,
  options,
  log,
}: {
  url: string;
  apiKey: string;
  log: Logger;
  options?: RequestInit;
}) {
  const response = await fetch(`${URL_PREFIX}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': apiKey,
    },
  });
  if (!response.ok) {
    errorHandler(response, log);
    return;
  }

  return await response.json();
}

export function blocksApi(
  apiKey: string,
  uid: string | undefined,
  log: Logger
) {
  return {
    async fetchBlockIdentifiersForFlowVersion(
      journeyIdentifier: string,
      version: number
    ): Promise<BlockIdentifier[]> {
      const blockIdentifiers = await client({
        url: `/blocks?journeyIdentifier=${journeyIdentifier}&version=${version}`,
        apiKey,
        log,
      });
      if (blockIdentifiers && blockIdentifiers.length === 0) {
        log.warn(
          `An error occurred while fetching blocks for a flow
  Identifier: ${journeyIdentifier}
  Version: ${version}
Please confirm that a flow with this identifier and version exists in your Dopt workspace.`
        );
      }
      return blockIdentifiers;
    },

    async fetchBlock(bid: string, version: number) {
      if (!uid || version === undefined) {
        return {
          [bid]: getBlockDefaultState(bid),
        };
      } else {
        if (!(bid in blockRequests)) {
          const blockRequest = client({
            url: `/block/${bid}?version=${version}&endUserIdentifier=${uid}`,
            apiKey,
            log,
          });
          blockRequests[bid] = blockRequest;
          const block = await blockRequest;
          return {
            [bid]: block || getBlockDefaultState(bid),
          };
        } else {
          const block = await blockRequests[bid];
          return {
            [bid]: block || getBlockDefaultState(bid),
          };
        }
      }
    },

    intent: createIntentApi(apiKey, uid, log),
  };
}

export const createIntentApi = (
  apiKey: string,
  uid: string | undefined,
  log: Logger
) => {
  const intentApi =
    (intention: keyof Intentions) =>
    async (bid: string, vid: number): Promise<Blocks> => {
      const response = await client({
        url: `/block/${bid}/${intention}?version=${vid}&endUserIdentifier=${uid}`,
        apiKey,
        options: {
          method: 'POST',
          body: '{}',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        log,
      });

      if (response && response.block && response.updated) {
        const { block, updated } = response;
        return {
          [bid]: block,
          ...updatedBlocksAsMap(updated),
        };
      }
      return {
        [bid]: getBlockDefaultState(bid),
      };
    };

  return {
    complete: intentApi('complete'),
    exit: intentApi('exit'),
    start: intentApi('start'),
    stop: intentApi('stop'),
  };
};
