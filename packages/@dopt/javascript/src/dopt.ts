import { Logger, LoggerProps } from '@dopt/logger';

import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

import { Block as BlockClass } from './block';

import { blocksApi, Blocks, Block, setupSocket } from '@dopt/javascript-common';
import { Socket } from 'socket.io-client';

export interface Config {
  userId: string | undefined;
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  flowVersions: Record<string, number>;
  optimisticUpdates?: boolean;
}

import { store } from './store';

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
  private blockVersions: Map<string, number>;
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

    this.blockVersions = new Map();

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
      blockVersions,
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

    const { fetchBlock, fetchBlockIdentifiersForFlowVersion } = this.blocksApi;

    const flowIdVersionTuples = Object.entries(flowVersions);

    await Promise.all(
      flowIdVersionTuples.map(([flowId, flowVersion]) =>
        fetchBlockIdentifiersForFlowVersion(flowId, flowVersion)
      )
    )
      .then((responses) => {
        responses.map((response, i) => {
          response.forEach(({ uuid }) =>
            blockVersions.set(uuid, flowIdVersionTuples[i][1])
          );
        });
      })

      .catch(() => {
        logger.error(`
            An error occurred while fetching blocks for the  
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
      });

    await Promise.all(
      Array.from(blockVersions).map(async ([blockIdentifier, blockVersion]) =>
        fetchBlock(blockIdentifier, blockVersion)
          .then((block: Block) => {
            store.setState({ [block.uuid]: block });
          })
          .catch(() => {
            logger.error(`
              An error occurred while fetching Block<{"uuid":"${blockIdentifier}","version":"${blockVersion}"}>
          `);
          })
      )
    ).catch(() => {
      logger.error(`TODO: jm`);
    });

    socketReadyPromise.then(() => {
      this.socket?.on('blocks', (blocks: Blocks) => {
        store.setState(blocks);
      });

      for (const [bid, version] of blockVersions) {
        this.socket?.emit('watch', bid, version);

        this.socket?.on(`${bid}_${version}`, (blocks: Blocks) => {
          store.setState(blocks);
        });
      }
      initializedPromiseResolver();
      this._initialized = true;
    });

    return this._initializaedPromise;
  }

  public block(identifier: string) {
    const { blockVersions, logger } = this;

    if (!this._initialized) {
      logger.error(
        `Accessing blocks prior to initialization will return default block states.`
      );
      return;
    }

    const version = blockVersions.get(identifier);
    if (!version) {
      logger.warn(
        `Could not find a Block<{"uuid":"${identifier}"}>. Confirm that the specified flow versions have this block.`
      );
      return;
    }

    // we can "safely" cast here
    version as number;

    return new BlockClass({
      logger,
      identifier,
      version,
      intents: this.blocksApi.blockIntent,
    });
  }

  public blocks() {
    return Array.from(this.blockVersions).map(([identifier]) => {
      return this.block(identifier);
    });
  }
}

export { Dopt };
