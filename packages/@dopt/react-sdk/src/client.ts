const URL_PREFIX = `https://blocks.dopt.com`;

import { Methods, Blocks, Block } from './types';
import { updatedBlocksAsMap } from './utils';

const blockRequests: { [identifier: string]: Promise<Block> } = {};

export async function client(
  url: string,
  apiKey: string,
  options?: { [key: string]: any }
) {
  return fetch(`${URL_PREFIX}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': apiKey,
    },
  }).then((response) => response.json());
}

export const createIntentApi = (userId: string, apiKey: string) => {
  const intentApi =
    (method: keyof Methods) =>
    async (identifier: string): Promise<Blocks> => {
      const { block, updated } = await client(
        `/user/${userId}/block/${identifier}/${method}`,
        apiKey,
        {
          method: 'POST',
          body: '{}',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        [identifier]: block,
        ...updatedBlocksAsMap(updated),
      };
    };

  const getBlockApi = async (identifier: string): Promise<Blocks> => {
    if (!blockRequests[identifier]) {
      const blockRequest = client(
        `/user/${userId}/block/${identifier}`,
        apiKey
      );
      blockRequests[identifier] = blockRequest;
      const block = await blockRequest;
      return {
        [identifier]: block,
      };
    } else {
      return {};
    }
  };

  return {
    get: getBlockApi,
    complete: intentApi('complete'),
    exit: intentApi('exit'),
    start: intentApi('start'),
    stop: intentApi('stop'),
  };
};
