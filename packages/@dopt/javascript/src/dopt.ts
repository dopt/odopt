import { Logger, LoggerProps } from '@dopt/logger';

import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

import { Block as BlockClass } from './block';
import { Flow as FlowClass } from './flow';

import { Mercator } from '@dopt/mercator';

import { Block, Field, Flow, ModelTypeConst } from '@dopt/block-types';

import {
  blocksApi,
  Blocks,
  setupSocket,
  getDefaultBlockState,
  getDefaultFlowState,
  generateFlowStateKey,
} from '@dopt/javascript-common';

import { Socket } from 'socket.io-client';

import { blockStore, flowStore } from './store';
/**
 * Providing this configuration to {@link Dopt} allows the
 * the SDK to fetch relevant data from the Dopt blocks API.
 */
export interface DoptConfig {
  /**
   * The userId you're fetching block and flows for.
   */
  userId: string | undefined;
  /**
   * An optional groupId for that userId.
   */
  groupId?: string | undefined;
  /**
   * Your blocks API key.
   */
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  /**
   * An object containing all flows and versions you'd like to fetch.
   */
  flowVersions: Record<string, number>;
  /**
   * A boolean which defines whether complete intents on step blocks should
   * optimistically update the client before hearing back that the change
   * has been committed.
   *
   * Within {@link Dopt}, this defaults to `true` unless explicitly set as `false`.
   */
  optimisticUpdates?: boolean;
}

export class Dopt {
  private userId?: DoptConfig['userId'];
  private apiKey: DoptConfig['apiKey'];
  private groupId?: DoptConfig['groupId'];
  private flowVersions: DoptConfig['flowVersions'];
  private optimisticUpdates: boolean;

  private _initialized: boolean;
  private _initializedPromise: Promise<void>;

  private logger: Logger;

  private blocksApi: ReturnType<typeof blocksApi>;
  private flowBlocks: Mercator<[Flow['uid'], Flow['version']], Block['uid'][]>;
  private blockFields: Map<Block['uid'], Map<Field['sid'], Field>>;
  private socket: Socket | undefined;

  /**
   * Creates a Dopt class instance.
   *
   * @remarks
   * Before using a Dopt instance, check whether the instance has been {@link Dopt.initialized}.
   *
   * @example
   * ```js
   * const dopt = new Dopt({
   *   apiKey: "<MY BLOCKS API KEY>",
   *   userId: "<MY USER'S ID>",
   *   flowVersions: { "welcome-to-dopt": 3 },
   * });
   * ```
   *
   * @param config - {@link DoptConfig}
   *
   * @returns A {@link Dopt} instance.
   *
   */
  constructor({
    apiKey,
    userId,
    groupId,
    logLevel,
    flowVersions,
    optimisticUpdates,
  }: DoptConfig) {
    this.apiKey = apiKey;
    this.userId = userId;
    this.groupId = groupId;
    this.flowVersions = flowVersions;

    // optimisticUpdates defaults to true
    this.optimisticUpdates =
      optimisticUpdates === false ? optimisticUpdates : true;

    this.logger = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });

    this.flowBlocks = new Mercator();

    this.blockFields = new Map();

    this._initialized = false;
    this.initialize();
  }

  /**
   * Returns a boolean when this Dopt instance has been intiailized.
   *
   * @example
   * ```js
   * dopt.initialized().then(() => {
   *   // Safely access block(s) or flow(s)!
   *   const blocks = dopt.blocks();
   *   const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * });
   * ```
   *
   * @returns A Promise.
   * Once initialization is complete, the promise resolves to `true`
   * when the initialization is successful and `false` otherwise.
   */
  async initialized(): Promise<boolean> {
    await this._initializedPromise;
    return this._initialized;
  }

  private async initialize(config?: Partial<DoptConfig>): Promise<void> {
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

          flow.blocks?.forEach((block) => {
            // initialize the block store
            blockStore.setState({ [block.uid]: block });

            // initialize block fields map
            if (block.type === ModelTypeConst) {
              this.blockFields.set(
                block.uid,
                block.fields.reduce((map, field) => {
                  return map.set(field.sid, field);
                }, new Map<Field['sid'], Field>())
              );
            }
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

      this._initialized = true;
      initializedPromiseResolver();
    });
  }

  /**
   * Returns the {@link Flow} associated with the given `id` and `version`.
   *
   * @remarks
   * This function will return `undefined` if this {@link Dopt} instance is not initialized.
   *
   * @example
   * ```js
   * const flow = dopt.flow("welcome-to-dopt", 3);
   * ```
   *
   * @param uid {@link FlowType['uid']} The id of the flow.
   * @param version {@link FlowType['version']} The version of the flow.
   *
   * @returns A {@link Flow} instance which matches the given `id` and `version`.
   */
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

  /**
   * Returns all flows associated with the `flowVersions` specified to the SDK.
   *
   * @remarks
   * This method will return an empty array if this {@link Dopt} instance is not initialized.
   *
   * @returns An array of all {@link Flow} instances stored by this {@link Dopt} class.
   */
  public flows() {
    const {
      logger,
      flowBlocks,
      blocksApi: { flowIntent: intent },
    } = this;

    if (!this._initialized) {
      logger.error(
        `Accessing flows() prior to initialization may return incomplete block states.`
      );
    }

    return Object.values(flowStore.getState()).map((flow) => {
      return new FlowClass({
        intent,
        flow,
        flowBlocks,
      });
    });
  }

  /**
   * Returns the {@link Block} associated with this `uid`.
   *
   * @remarks
   * This function will return `undefined` if this {@link Dopt} instance is not initialized.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * ```
   *
   * @param uid {@link BlockType['uid']} The uid of the block.
   *
   * @returns A {@link Block} instance corresponding to the uid.
   */
  public block(uid: string) {
    const {
      logger,
      blocksApi: { blockIntent: intent },
    } = this;

    if (!this._initialized) {
      logger.error(
        `Accessing block() prior to initialization will return default block states.`
      );
    }

    const block = blockStore.getState()[uid] || getDefaultBlockState(uid);

    return new BlockClass({
      intent,
      block,
      optimisticUpdates: this.optimisticUpdates,
      fieldMap: this.blockFields.get(block.uid) || null,
    });
  }

  /**
   * Returns all blocks associated with the `flowVersions` specified to the SDK.
   *
   * @remarks
   * This method will return an empty array if this {@link Dopt} instance is not initialized.
   *
   * @returns An array of all {@link Block} instances stored by this {@link Dopt} class.
   */
  public blocks() {
    const {
      logger,
      blocksApi: { blockIntent: intent },
    } = this;

    if (!this._initialized) {
      logger.error(
        `Accessing blocks() prior to initialization may return incomplete block states.`
      );
    }

    return Object.entries(blockStore.getState()).map(([, block]) => {
      return new BlockClass({
        intent,
        block,
        optimisticUpdates: this.optimisticUpdates,
        fieldMap: this.blockFields.get(block.uid) || null,
      });
    });
  }
}
