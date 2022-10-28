import { Intentions, Blocks, Block, BlockIdentifier } from './types';
import { getBlockDefaultState, PKG_VERSION, PKG_NAME } from './utils';

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
      'x-pkg-version': PKG_VERSION,
      'x-pkg-name': PKG_NAME,
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
          `An error occurred while fetching blocks for a flow for FlowVersions<{ ${journeyIdentifier} : ${version} }>
Please confirm that a flow with this identifier and version exists in your Dopt workspace.`
        );
      } else {
        log.info(
          `${blockIdentifiers.length} blocks identifiers fetched for FlowVersions<{ ${journeyIdentifier} : ${version} }>`
        );
      }
      return blockIdentifiers;
    },

    async fetchBlock(bid: string, version: number) {
      if (!uid || version === undefined) {
        if (!uid) {
          log.info(
            `'userId' is undefined while fetching the Block<{ id : ${bid} }>, setting block state to its defaults.`
          );
        } else {
          log.warn(
            `Flow version is undefined/wrong while fetching the Block<{ id : ${bid} }>, setting block state to its defaults.`
          );
        }
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
          if (block) {
            log.info(
              `Details for Block<{ id : ${bid} }> for Flow<{ version : ${version} }> fetched successfully.`
            );
          } else {
            log.error(
              `An error occurred in fetching Block<{ id : ${bid} }>  for Flow<{ version : ${version} }>, setting block state to its defaults.`
            );
          }
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

      if (response && response.block) {
        log.info(
          `Block<{ id : ${bid} }> successfully  "${
            intention === 'complete' ? intention + 'd' : intention + 'ed'
          }" the intention`
        );
        const { block } = response;
        return {
          [bid]: block,
        };
      }
      log.error(
        `Block<{ id : ${bid} }> failed to trigger the intention "${intention}"`
      );
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
