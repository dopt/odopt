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
} from '@dopt/javascript-common';
import { Socket } from 'socket.io-client';

export interface Config {
  userId: string | undefined;
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  flowVersions: Record<string, number>;
  optimisticUpdates?: boolean;
}

import { blockStore, flowStore } from './store';

class Dopt {
  private userId?: Config['userId'];
  private apiKey: Config['apiKey'];
  private logLevel?: Config['logLevel'];
  private flowVersions: Config['flowVersions'];

  public _initialized: boolean;
  public _initializaedPromise: Promise<void>;

  private logger: Logger;
  private optimisticUpdates?: boolean;

  private blocksApi: ReturnType<typeof blocksApi>;
  private flowBlocks: Mercator<[Flow['sid'], Flow['version']], Block['uid'][]>;
  private socket: Socket | undefined;

  constructor({
    apiKey,
    userId,
    logLevel,
    flowVersions,
    optimisticUpdates = true,
  }: Config) {
    this.apiKey = apiKey;
    this.userId = userId;
    this.flowVersions = flowVersions;
    this.logLevel = logLevel;
    this.optimisticUpdates = optimisticUpdates;

    this.logger = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });

    this.flowBlocks = new Mercator();

    this._initialized = false;
    this.initialize();
  }

  async initialized() {
    return this._initializaedPromise;
  }

  async initialize(config?: Partial<Config>): Promise<void> {
    // Merge any updated properties into the instance
    Object.assign(this, config);

    const {
      apiKey,
      flowBlocks,
      userId,
      flowVersions,
      logger,
      optimisticUpdates = true,
    } = this;

    if (!userId) {
      logger.info(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );
      return Promise.reject();
    }

    let initializedPromiseResolver: () => void;
    this._initializaedPromise = new Promise<void>((resolve) => {
      initializedPromiseResolver = resolve;
    });

    this.blocksApi = blocksApi(apiKey, userId, logger, {
      optimisticUpdates,
      urlPrefix: URL_PREFIX,
      packageVersion: PKG_VERSION,
      packageName: PKG_NAME,
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
            });
          }

          flowStore.setState((flowMap) => {
            return flowMap.set([flow.uid, flow.version], flow);
          });

          this.flowBlocks.set(
            [flow.sid, flow.version],
            flow.blocks?.map(({ uid }) => uid) || []
          );

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
        flowStore.setState((flows) => {
          return flows.set([flow.uid, flow.version], flow);
        });
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
          flowStore.setState((flows) => {
            return flows.set([flow.uid, flow.version], flow);
          });
        });
      });

      initializedPromiseResolver();
      this._initialized = true;
    });

    return this._initializaedPromise;
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
      flowStore.getState().get([uid, version]) ||
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
    return Array.from(flowStore.getState().entries()).map(([, flow]) => {
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
