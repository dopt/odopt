import {
  getDefaultBlockState,
  getDefaultFlowState,
  INTENT_POST_OPTIONS,
} from './utils';

import { Flow, Block, FlowIntent, BlockIntent } from '@dopt/block-types';

import { errorHandler } from './error-handler';
import { Logger } from '@dopt/logger';

export async function client({
  url,
  apiKey,
  options,
  logger,
  urlPrefix,
  packageVersion,
  packageName,
}: {
  url: string;
  apiKey: string;
  logger: Logger;
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
    errorHandler(response, logger);
    return;
  }

  if (response.status === 204) {
    return response;
  }

  return response.json();
}

type UserIdentifier = {
  userId: string | undefined;
};

type GroupIdentifier = {
  groupId: string | undefined;
};

type Version = {
  version: number;
};

export type BlocksApi = {
  apiKey: string;
  userId: UserIdentifier['userId'];
  logger: Logger;
  config: {
    optimisticUpdates: boolean;
    urlPrefix: string;
    packageVersion: string;
    packageName: string;
  };
  groupId?: GroupIdentifier['groupId'];
};
type BlockParams = Pick<Block, 'uid' | 'version'>;
type FlowParams = Pick<Flow, 'uid' | 'version'>;
type BlockIntentParams = BlockParams & { intent: BlockIntent };
type FlowIntentParams = FlowParams & { intent: FlowIntent };

const queryParams =
  ({
    userId,
    groupId,
  }: {
    userId: UserIdentifier['userId'];
    groupId?: GroupIdentifier['groupId'];
  }) =>
  ({ version }: Version) =>
    `version=${version}&userIdentifier=${userId}${
      groupId ? `&groupIdentifier=${groupId}` : ``
    }`;

export function blocksApi({
  apiKey,
  userId,
  logger,
  config,
  groupId,
}: BlocksApi) {
  const query = queryParams({ userId, groupId });

  return {
    async getFlow({ uid, version }: FlowParams): Promise<Flow> {
      const flow = (await client({
        url: `/v1/flow/${uid}?include[block]=true&${query({
          version,
        })}`,
        apiKey,
        logger,
        ...config,
      })) as Flow;

      if (flow) {
        logger.info(
          `Flow<{"sid":"${uid}","version":${version}}> fetched successfully.`
        );
        logger.debug(`${'\n'}${JSON.stringify(flow, null, 2)}`);
      } else {
        logger.error(
          `An error occurred while fetching Flow<{"sid":"${uid}","version":${version}}>, setting flow state to its defaults.`
        );
      }

      return flow || getDefaultFlowState(uid, version);
    },
    async getBlock({ uid, version }: BlockParams): Promise<Block> {
      const block = (await client({
        url: `/v1/block/${uid}?${query({ version })}`,
        apiKey,
        logger,
        ...config,
      })) as Block;

      if (block) {
        logger.info(
          `Block<{"uid":"${uid}","version":${version}}> fetched successfully.`
        );
        logger.debug(`${'\n'}${JSON.stringify(block, null, 2)}`);
      } else {
        logger.error(
          `An error occurred while fetching Block<{"uid":"${uid}","version":${version}}>, setting block state to its defaults.`
        );
      }

      return block || getDefaultBlockState(uid, version);
    },
    async flowIntent({
      uid,
      version,
      intent,
    }: FlowIntentParams): Promise<void> {
      logger.info(
        `Calling \`${intent}\` on Flow<{"sid":"${uid}","version":${version}}>`
      );
      logger.debug(`/v1/flow/${uid}/${intent}?${query({ version })}`);

      const response = await client({
        url: `/v1/flow/${uid}/${intent}?${query({ version })}`,
        apiKey,
        logger,
        options: INTENT_POST_OPTIONS,
        ...config,
      });

      if (response && response.ok) {
        logger.info(
          `Calling \`${intent}\` on Flow<{"sid":"${uid}","version":${version}}> was successful.`
        );
        return Promise.resolve();
      }
      logger.error(
        `Calling \`${intent}\` on Flow<{"sid":"${uid}","version":${version}}> failed.`
      );
      return Promise.reject();
    },
    async blockIntent({
      uid,
      version,
      intent,
    }: BlockIntentParams): Promise<void> {
      logger.info(
        `Calling \`${intent}\` on Block<{"uid":"${uid}","version":${version}}>`
      );
      logger.debug(`/v1/block/${uid}/${intent}?${query({ version })}`);

      const response = await client({
        url: `/v1/block/${uid}/${intent}?${query({ version })}`,
        apiKey,
        logger,
        options: INTENT_POST_OPTIONS,
        ...config,
      });

      if (response && response.ok) {
        logger.info(
          `Calling \`${intent}\` on  Block<{"uid":"${uid}","version":${version}}> was successful.`
        );
        return Promise.resolve();
      }
      logger.info(
        `Calling \`${intent}\` on  Block<{"uid":"${uid}","version":${version}}> failed.`
      );
      return Promise.reject();
    },
  };
}
