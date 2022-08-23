const URL_PREFIX = `http://localhost:7070`;

import { Methods, Blocks, Block } from './types';
import { getBlockDefaultState, updatedBlocksAsMap } from './utils';

import { errorHandler } from './error-handler';

const blockRequests: { [identifier: string]: Promise<Block> } = {};

export async function client(
  url: string,
  apiKey: string,
  options?: { [key: string]: any }
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

export const createIntentApi = (userId: string, apiKey: string) => {
  const intentApi =
    (method: keyof Methods) =>
    async (identifier: string): Promise<Blocks> => {
      const response = await client(
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

      if (response && response.block && response.updated) {
        const { block, updated } = response;
        return {
          [identifier]: block,
          ...updatedBlocksAsMap(updated),
        };
      }
      return {};
    };

  const getBlockApi = async (identifier: string): Promise<Blocks> => {
    if (!(identifier in blockRequests)) {
      const blockRequest = client(
        `/user/${userId}/block/${identifier}`,
        apiKey
      );
      blockRequests[identifier] = blockRequest;
      const block = await blockRequest;
      return {
        [identifier]: block || getBlockDefaultState(identifier),
      };
    } else {
      const block = await blockRequests[identifier];
      return {
        [identifier]: block || getBlockDefaultState(identifier),
      };
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
