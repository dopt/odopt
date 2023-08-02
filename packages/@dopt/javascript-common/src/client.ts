import { getDefaultBlockState, getDefaultFlowState } from './utils';

import { INTENT_SIDE_EFFECT_HEADER } from '@dopt/block-api-types';
import type {
  Block,
  Flow,
  Transitions,
  FlowIntent,
} from '@dopt/block-api-types';

import { Logger } from '@dopt/logger';
import { errorHandler } from './error-handler';

function hasSideEffects(response: Response) {
  return response.headers.get(INTENT_SIDE_EFFECT_HEADER) === 'true';
}

const INTENT_POST_OPTIONS = {
  method: 'POST',
  body: '{}',
  headers: {
    'Content-Type': 'application/json',
  },
};

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

export type BlocksApi = {
  apiKey: string;
  userId: string | undefined;
  logger: Logger;
  config: {
    urlPrefix: string;
    packageVersion: string;
    packageName: string;
  };
  groupId?: string | undefined;
};

export type BlockParams = {
  uid: Block['uid'];
  sid: Block['sid'];
  version: Block['version'];
};

export type FlowParams = {
  sid: Flow['sid'];
  version: Flow['version'];
  force?: boolean;
};

export type BlockIntentParams = BlockParams & {
  transitions: Transitions['transitions'];
};

export type FlowIntentParams = FlowParams & { intent: FlowIntent };

export const queryParams =
  ({
    userId,
    groupId,
  }: {
    userId: BlocksApi['userId'];
    groupId?: BlocksApi['groupId'];
  }) =>
  ({ version, force }: { version: number; force?: boolean }) =>
    `version=${version}&userIdentifier=${userId}${
      groupId ? `&groupIdentifier=${groupId}` : ``
    }${force ? `&force=${force}` : ``}`;

export function blocksApi({
  apiKey,
  userId,
  logger,
  config,
  groupId,
}: BlocksApi) {
  const query = queryParams({ userId, groupId });

  return {
    async getFlow({ sid, version }: FlowParams): Promise<Flow> {
      const flow = (await client({
        url: `/v2/flow/${sid}?include=block&${query({
          version,
        })}`,
        apiKey,
        logger,
        ...config,
      })) as Flow;

      if (flow) {
        logger.info(
          `Flow<{"sid":"${sid}","version":${version}}> fetched successfully.`
        );
        logger.debug(`\n${JSON.stringify(flow, null, 2)}`);
      } else {
        logger.error(
          `An error occurred while fetching Flow<{"sid":"${sid}","version":${version}}>, setting flow state to its defaults.`
        );
      }

      return flow || getDefaultFlowState(sid, version);
    },
    async getBlock({ uid, sid, version }: BlockParams): Promise<Block> {
      const block = (await client({
        url: `/v2/block/${uid}?${query({ version })}`,
        apiKey,
        logger,
        ...config,
      })) as Block;

      if (block) {
        logger.info(
          `Block<{"uid":"${uid}","version":${version}}> fetched successfully.`
        );
        logger.debug(`\n${JSON.stringify(block, null, 2)}`);
      } else {
        logger.error(
          `An error occurred while fetching Block<{"uid":"${uid}","version":${version}}>, setting block state to its defaults.`
        );
      }

      return block || getDefaultBlockState(uid, sid, version);
    },
    async flowIntent({
      sid,
      version,
      intent,
      force,
    }: FlowIntentParams): Promise<boolean> {
      /**
       * We add this check here to prevent SDK callers from mistakenly passing in
       * truth-y values like objects, etc.
       *
       * We will only force with `force: true`.
       */
      if (force !== true) {
        force = false;
      }

      /**
       * We add this check here to prevent SDK callers from mistakenly passing in
       * force for non-start and non-reset intents. The API will throw an error
       * if we try to force those intents.
       */
      if (force && intent !== 'start' && intent !== 'reset') {
        logger.warn(
          `Calling \`${intent}\` with force is not supported. \`force\` will be ignored`
        );

        force = false;
      }

      const forceful = force ? ' with ?force=true' : '';
      logger.info(
        `Calling \`${intent}\` on Flow<{"sid":"${sid}","version":${version}}>${forceful}`
      );

      const url = `/v2/flow/${sid}/${intent}?${query({ version, force })}`;

      logger.debug(`Formed url: ${url}`);

      const response = await client({
        url,
        apiKey,
        logger,
        options: INTENT_POST_OPTIONS,
        ...config,
      });

      if (response && response.ok) {
        logger.info(
          `Calling \`${intent}\` on Flow<{"sid":"${sid}","version":${version}}>${forceful} was successful.`
        );

        return Promise.resolve(hasSideEffects(response as Response));
      }
      logger.error(
        `Calling \`${intent}\` on Flow<{"sid":"${sid}","version":${version}}>${forceful} failed.`
      );
      return Promise.reject();
    },
    async blockIntent({
      uid,
      version,
      transitions,
    }: BlockIntentParams): Promise<boolean> {
      const transitionQueryString = transitions
        .map((transition) => `transitions=${transition}`)
        .join('&');

      logger.info(
        `Calling \`${transitionQueryString}\` on Block<{"uid":"${uid}","version":${version}}>`
      );

      if (transitions.length === 0) {
        logger.error('No transitions provided, cannot transition the block');
        return Promise.reject();
      }

      const url = `/v2/block/${uid}/transition?${query({
        version,
      })}&${transitionQueryString}`;

      logger.debug(`Formed url: ${url}`);

      const response = await client({
        url,
        apiKey,
        logger,
        options: INTENT_POST_OPTIONS,
        ...config,
      });

      if (response && response.ok) {
        logger.info(
          `Calling \`${transitionQueryString}\` on  Block<{"uid":"${uid}","version":${version}}> was successful.`
        );

        return Promise.resolve(hasSideEffects(response as Response));
      }
      logger.info(
        `Calling \`${transitionQueryString}\` on  Block<{"uid":"${uid}","version":${version}}> failed.`
      );
      return Promise.reject();
    },
  };
}
