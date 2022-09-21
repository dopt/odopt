const URL_PREFIX = `https://blocks.dopt.com`;

import { Intentions, Blocks, Block, BlockIdentifier } from './types';
import { getBlockDefaultState, updatedBlocksAsMap } from './utils';

import { errorHandler } from './error-handler';

const blockRequests: { [identifier: string]: Promise<Block> } = {};

export async function client(
  url: string,
  apiKey: string,
  options?: RequestInit
) {
  const response = await fetch(`${URL_PREFIX}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': apiKey,
    },
  });
  if (!response.ok) {
    errorHandler(response);
    return;
  }

  return await response.json();
}

export function blocksApi(apiKey: string, uid: string) {
  return {
    async fetchBlockIdentifiersForFlowVersion(
      journeyIdentifier: string,
      version: number
    ): Promise<BlockIdentifier[]> {
      return await client(
        `/blocks?journeyIdentifier=${journeyIdentifier}&version=${version}`,
        apiKey
      );
    },

    async fetchBlock(bid: string, version: number) {
      if (!(bid in blockRequests)) {
        const blockRequest = client(
          `/block/${bid}?version=${version}&endUserIdentifier=${uid}`,
          apiKey
        );
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
    },

    intent: createIntentApi(apiKey, uid),
  };
}

export const createIntentApi = (apiKey: string, uid: string) => {
  const intentApi =
    (intention: keyof Intentions) =>
    async (bid: string, vid: number): Promise<Blocks> => {
      const response = await client(
        `/block/${bid}/${intention}?version=${vid}&endUserIdentifier=${uid}`,
        apiKey,
        {
          method: 'POST',
          body: '{}',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response && response.block && response.updated) {
        const { block, updated } = response;
        return {
          [bid]: block,
          ...updatedBlocksAsMap(updated),
        };
      }
      return {};
    };

  return {
    complete: intentApi('complete'),
    exit: intentApi('exit'),
    start: intentApi('start'),
    stop: intentApi('stop'),
  };
};
