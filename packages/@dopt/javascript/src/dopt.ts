import { Logger, LoggerProps } from '@dopt/logger';

import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

import { Block as BlockClass } from './block';
import { Flow as FlowClass } from './flow';

import { Mercator } from '@dopt/mercator';

import type { Block, Flow } from '@dopt/block-types';

import {
  blocksApi,
  Blocks,
  setupSocket,
  getDefaultBlockState,
  getDefaultFlowState,
  generateFlowStateKey,
} from '@dopt/javascript-common';
import { Socket } from 'socket.io-client';

export interface Config {
  userId: string | undefined;
  groupId?: string | undefined;
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  flowVersions: Record<string, number>;
}

import { blockStore, flowStore } from './store';

class Dopt {
  private userId?: Config['userId'];
  private apiKey: Config['apiKey'];
  private logLevel?: Config['logLevel'];
  private groupId?: Config['groupId'];
  private flowVersions: Config['flowVersions'];

  public _initialized: boolean;
  public _initializedPromise: Promise<void>;

  private logger: Logger;

  private blocksApi: ReturnType<typeof blocksApi>;
  private flowBlocks: Mercator<[Flow['uid'], Flow['version']], Block['uid'][]>;
  private socket: Socket | undefined;

  constructor({ apiKey, userId, groupId, logLevel, flowVersions }: Config) {
    this.apiKey = apiKey;
    this.userId = userId;
    this.groupId = groupId;
    this.flowVersions = flowVersions;
    this.logLevel = logLevel;

    this.logger = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });

    this.flowBlocks = new Mercator();

    this._initialized = false;
    this.initialize();
  }

  async initialized() {
    return this._initializedPromise;
  }

  async initialize(config?: Partial<Config>): Promise<void> {
    // Merge any updated properties into the instance
    Object.assign(this, config);

    const { apiKey, userId, groupId, flowVersions, logger } = this;

    if (!userId) {
      logger.info(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );
      return Promise.reject();
    }

    if (!groupId) {
      logger.info(
        'The `groupId` prop is undefined. The SDK wont be able to target the entry conditions and updates if you have identified and using groups properties.'
      );
    }

    let initializedPromiseResolver: () => void;
    this._initializedPromise = new Promise<void>((resolve) => {
      initializedPromiseResolver = resolve;
    });

    this.blocksApi = blocksApi({
      apiKey,
      userId,
      groupId,
      logger,
      config: {
        urlPrefix: URL_PREFIX,
        packageVersion: PKG_VERSION,
        packageName: PKG_NAME,
      },
    });

    this.socket = setupSocket(apiKey, userId, logger, URL_PREFIX);

    const socketReadyPromise = new Promise<void>((resolve) => {
      this.socket?.on('ready', () => resolve());
    });

    const { getFlow, flowIntent } = this.blocksApi;

    await Promise.all(
      Object.entries(flowVersions).map(([uid, version]) => {
        return getFlow({ uid, version });
      })
    )
      .then((flows: Flow[]) => {
        flows.forEach((flow) => {
          if (!flow.state.started) {
            flowIntent({
              uid: flow.uid,
              version: flow.version,
              intent: 'start',
            }).catch(() => {
              // do nothing, this error is already handled for us
            });
          }

          // initialize the flow store
          flowStore.setState(() => ({
            [generateFlowStateKey(flow.uid, flow.version)]: flow,
          }));

          this.flowBlocks.set(
            [flow.uid, flow.version],
            flow.blocks?.map(({ uid }) => uid) || []
          );

          // initialize the block store
          flow.blocks?.forEach((block) => {
            blockStore.setState({ [block.uid]: block });
          });
        });
      })
      .catch(() => {
        logger.error(`
            An error occurred while fetching blocks for the
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
      });

    socketReadyPromise.then(() => {
      this.socket?.on('blocks', (blocks: Blocks) => {
        blockStore.setState(blocks);
      });

      this.socket?.on('flow', (flow: Flow) => {
        flowStore.setState(() => ({
          [generateFlowStateKey(flow.uid, flow.version)]: flow,
        }));
      });

      Object.values(blockStore.getState()).forEach(({ uid, version }) => {
        this.socket?.emit('watch:block', uid, version);

        this.socket?.on(`${uid}_${version}`, (blocks: Blocks) => {
          blockStore.setState(blocks);
        });
      });

      Object.entries(flowVersions).forEach(([uid, version]) => {
        this.socket?.emit('watch:flow', uid, version);
        this.socket?.on(`${uid}_${version}`, (flow: Flow) => {
          flowStore.setState(() => ({
            [generateFlowStateKey(flow.uid, flow.version)]: flow,
          }));
        });
      });

      initializedPromiseResolver();
      this._initialized = true;
    });

    return this._initializedPromise;
  }

  public flow(uid: Flow['uid'], version: Flow['version']) {
    const {
      logger,
      flowBlocks,
      blocksApi: { flowIntent: intent },
    } = this;
    if (!this._initialized) {
      logger.error(
        `Accessing flow prior to initialization will return default flow states.`
      );
      return;
    }
    const flow =
      flowStore.getState()[generateFlowStateKey(uid, version)] ||
      getDefaultFlowState(uid, version);

    return new FlowClass({
      intent,
      flow,
      flowBlocks,
    });
  }

  public flows() {
    const {
      flowBlocks,
      blocksApi: { flowIntent: intent },
    } = this;
    return Object.values(flowStore.getState()).map((flow) => {
      return new FlowClass({
        intent,
        flow,
        flowBlocks,
      });
    });
  }

  public block(uid: string) {
    const {
      logger,
      blocksApi: { blockIntent: intent },
    } = this;

    if (!this._initialized) {
      logger.error(
        `Accessing blocks prior to initialization will return default block states.`
      );
    }

    const block = blockStore.getState()[uid] || getDefaultBlockState(uid);

    return new BlockClass({
      intent,
      block,
    });
  }

  public blocks() {
    return Object.entries(blockStore.getState()).map(([, block]) => {
      return new BlockClass({
        intent: this.blocksApi.blockIntent,
        block,
      });
    });
  }
}

export { Dopt };
