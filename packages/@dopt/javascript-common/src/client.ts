import { INTENT_POST_OPTIONS } from './utils';

import { Flow, Block, FlowIntent, BlockIntent } from '@dopt/block-types';

import { errorHandler } from './error-handler';
import { Logger } from '@dopt/logger';
//import { Block } from './types';

export async function client({
  url,
  apiKey,
  options,
  log,
  urlPrefix,
  packageVersion,
  packageName,
}: {
  url: string;
  apiKey: string;
  log: Logger;
  options?: RequestInit;
  urlPrefix: string;
  packageVersion: string;
  packageName: string;
}) {
  const response = await fetch(`${urlPrefix}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': apiKey,
      'x-pkg-version': packageVersion,
      'x-pkg-name': packageName,
    },
  });
  if (!response.ok) {
    errorHandler(response, log);
    return;
  }

  if (response.status === 204) {
    return response;
  }

  return response.json();
}

type UserIdentifier = {
  userIdentifier: string | undefined;
};
type Version = {
  version: number;
};

type BlockParams = Pick<Block, 'uid' | 'version'>;
type FlowParams = Pick<Flow, 'uid' | 'version'>;
type BlockIntentParams = BlockParams & { intent: BlockIntent };
type FlowIntentParams = FlowParams & { intent: FlowIntent };

const queryParams =
  ({ userIdentifier }: UserIdentifier) =>
  ({ version }: Version) =>
    `version=${version}&userIdentifier=${userIdentifier}`;

export function blocksApi(
  apiKey: string,
  userIdentifier: UserIdentifier['userIdentifier'],
  log: Logger,
  config: {
    optimisticUpdates: boolean;
    urlPrefix: string;
    packageVersion: string;
    packageName: string;
  }
) {
  const query = queryParams({ userIdentifier });

  return {
    async getFlow({ uid, version }: FlowParams): Promise<Flow> {
      return (await client({
        url: `/v1/flow/${uid}?include[block]=true&${query({
          version,
        })}`,
        apiKey,
        log,
        ...config,
      })) as Flow;
    },
    async getBlock({ uid, version }: BlockParams): Promise<Block> {
      return (await client({
        url: `/v1/block/${uid}?${query({ version })}`,
        apiKey,
        log,
        ...config,
      })) as Block;
    },
    async flowIntent({
      uid,
      version,
      intent,
    }: FlowIntentParams): Promise<void> {
      return (await client({
        url: `/v1/flow/${uid}/${intent}?${query({ version })}`,
        apiKey,
        log,
        options: INTENT_POST_OPTIONS,
        ...config,
      })) as void;
    },
    async blockIntent({
      uid,
      version,
      intent,
    }: BlockIntentParams): Promise<void> {
      return (await client({
        url: `/v1/block/${uid}/${intent}?${query({ version })}`,
        apiKey,
        log,
        options: INTENT_POST_OPTIONS,
        ...config,
      })) as void;
    },
  };
}
