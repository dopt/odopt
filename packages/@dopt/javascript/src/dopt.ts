import { Logger, LoggerProps } from '@dopt/logger';

import { PKG_NAME, PKG_VERSION, URL_PREFIX } from './utils';

import { Block as BlockClass } from './block';
import { Flow as FlowClass } from './flow';

import {
  blocksApi,
  getDefaultBlockState,
  getDefaultFlowState,
  setupSocket,
  Flow,
  Block,
  Field,
} from '@dopt/javascript-common';

import { Socket } from 'socket.io-client';

import type { Blocks } from './store';
import { blockStore, flowStore } from './store';

type PromiseWithResolver = {
  promise: Promise<boolean>;
  resolver: (status: boolean) => void;
};

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

  private _setup: boolean;
  private _setupPromise: Promise<void>;
  private _flowPromises: Map<Flow['uid'], PromiseWithResolver>;

  private logger: Logger;

  private blocksApi: ReturnType<typeof blocksApi>;
  private flowBlocks: Map<Flow['uid'], Block['uid'][]>;
  private blockFields: Map<Block['uid'], Map<Field['sid'], Field>>;
  private socket: Socket | undefined;
  private blockUidBySid: Map<Block['sid'], Block['uid']>;

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

    this.flowBlocks = new Map();
    this.blockUidBySid = new Map();
    this.blockFields = new Map();

    this._flowPromises = new Map();

    this._setup = false;

    this._setupPromise = this.initialize();

    this._setupPromise.then(() => (this._setup = true));
  }

  /**
   * Returns `true` when this Dopt instance has been intiailized.
   *
   * Dopt-level initialization is defined as:
   * - all flows have been fetched
   * - Dopt's socket connection is ready
   * - all flows which need to be started have been started
   *
   * @remarks
   * Note, this hook does not check whether any initialization steps had errors.
   * Use `flow.initialized` to check flow status, including failures,
   * at a more granular level.
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
   * Once all of Dopt's initialization is complete,
   * the promise resolves to `true`.
   */
  async initialized(): Promise<boolean> {
    await this._setupPromise;
    await Promise.all(
      Array.from(this._flowPromises.values()).map(({ promise }) => promise)
    );

    return true;
  }

  private async flowInitialized(uid: Flow['uid']): Promise<boolean> {
    await this._setupPromise;
    const flowPromise = this._flowPromises.get(uid);
    return flowPromise ? flowPromise.promise : false;
  }

  private async initialize(config?: Partial<DoptConfig>): Promise<void> {
    // Merge any updated properties into the instance
    Object.assign(this, config);

    const { apiKey, userId, groupId, flowVersions, logger } = this;

    if (!userId) {
      logger.error(
        'The `userId` prop is undefined. The SDK will partially initialize, returning defaults for any requested blocks until the `userId` prop becomes defined.'
      );

      throw new Error('The userId prop must be defined within the DoptConfig.');
    }

    if (!groupId) {
      logger.info(
        'The `groupId` prop is undefined. The SDK wont be able to target the entry conditions and updates if you have identified and using groups properties.'
      );
    }

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

    this.socket = setupSocket({
      apiKey,
      userId,
      log: logger,
      urlPrefix: URL_PREFIX,
      groupId,
    });

    const socketReadyPromise = new Promise<void>((resolve) => {
      this.socket?.on('ready', () => resolve());
    });

    const { getFlow, flowIntent } = this.blocksApi;

    try {
      const flows: Flow[] = await Promise.all(
        Object.entries(flowVersions).map(([sid, version]) => {
          return getFlow({ sid, version });
        })
      );

      flows.forEach((flow) => {
        const flowPromise: PromiseWithResolver = {
          /**
           * In its default state, the flowPromise
           * resolves to true (i.e. the flow is already initialized).
           */
          promise: Promise.resolve(true),
          /**
           * In its default state, the flowPromise
           * cannot be resolved. If a new flowPromise
           * needs to be created (see below),
           * the resolver will be overwritten.
           */
          resolver: (status: boolean) => {
            status;
          },
        };

        if (!flow.state.started) {
          /**
           * If the flow has not been started,
           * we override the flowPromise.
           */
          flowPromise.promise = new Promise((resolve) => {
            flowPromise.resolver = resolve;
          });

          flowIntent({
            sid: flow.sid,
            version: flow.version,
            intent: 'start',
          }).then(
            (intentHasSideEffects) => {
              /**
               * If the intent doesn't have side effects,
               * we can resolve the promise as successfully
               * initialized.
               */
              if (!intentHasSideEffects) {
                flowPromise.resolver(true);
              }
            },
            () => {
              /**
               * If the intent fails,
               * we can resolve the promise as unsuccessful.
               */
              flowPromise.resolver(false);
            }
          );
        }

        this._flowPromises.set(flow.uid, flowPromise);

        // initialize the flow store
        flowStore.setState(() => ({
          [flow.uid]: flow,
        }));

        this.flowBlocks.set(flow.uid, flow.blocks?.map(({ uid }) => uid) || []);

        flow.blocks?.forEach((block) => {
          // initialize the block store
          blockStore.setState({ [block.uid]: block });

          // initialize block uid look up map
          this.blockUidBySid.set(block.sid, block.uid);

          // initialize block fields map
          this.blockFields.set(
            block.uid,
            block.fields.reduce((map, field) => {
              return map.set(field.sid, field);
            }, new Map<Field['sid'], Field>())
          );
        });
      });
    } catch (error) {
      logger.error(`
            An error occurred while fetching blocks for the
            flow versions specified: \`${JSON.stringify(flowVersions)}\`
          `);
    }

    await socketReadyPromise;

    const updateBlocksState = (blocks: Blocks): void => {
      blockStore.setState(blocks);
    };

    const updateFlowState = (flow: Flow): void => {
      flowStore.setState(() => ({
        [flow.uid]: flow,
      }));

      /**
       * In the case where the intent did have side effects,
       * those side effects will propagate back to the SDK
       * as flow state updates. We resolve those respective
       * promises here.
       */
      const flowPromise = this._flowPromises.get(flow.uid);
      flowPromise && flowPromise.resolver(true);
    };

    this.socket?.on('blocks', (blocks: Blocks) => {
      updateBlocksState(blocks);
    });

    this.socket?.on('flow', (flow: Flow) => {
      updateFlowState(flow);
    });

    Object.values(blockStore.getState()).forEach(({ uid, version }) => {
      this.socket?.emit('watch:block', uid, version);
      this.socket?.on(`${uid}_${version}`, (blocks: Blocks) => {
        updateBlocksState(blocks);
      });
    });

    Object.entries(flowVersions).forEach(([uid, version]) => {
      this.socket?.emit('watch:flow', uid, version);
      this.socket?.on(`${uid}_${version}`, (flow: Flow) => {
        updateFlowState(flow);
      });
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
   * const flow = dopt.flow("welcome-to-dopt");
   * ```
   *
   * @param uid {@link Flow['uid']} The id of the flow.
   * @param version {@link Flow['version']} **Deprecated**.
   * Previously, this parameter allowed specification of the version of the flow.
   * Now, Dopt pulls the flow's version from the {@link DoptConfig}'s `flowVersions` property.
   *
   * @returns A {@link Flow} instance which matches the given `id`.
   */
  public flow(sid: Flow['sid'], version?: number) {
    const {
      logger,
      flowBlocks,
      blocksApi: { flowIntent: intent },
    } = this;

    /**
     * `version` is deprecated but is kept for backwards compatibility.
     */
    if (version != null) {
      logger.info('The version parameter is deprecated and will not be used.');
    }

    if (!this._setup) {
      logger.info(
        'Accessing flow() prior to initialization may return incomplete block states. Check `flow.initialized()`.'
      );
    }

    const flow =
      flowStore.getState()[sid] ||
      getDefaultFlowState(sid, this.flowVersions[sid]);

    return new FlowClass({
      intent,
      flow,
      flowBlocks,
      flowPromise: this.flowInitialized(sid),
      createBlock: this.block.bind(this),
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

    if (!this._setup) {
      logger.info(
        'Accessing flows() prior to initialization may return incomplete block states. Check `flow.initialized()`.'
      );
    }

    return Object.values(flowStore.getState()).map((flow) => {
      return new FlowClass({
        intent,
        flow,
        flowBlocks,
        flowPromise: this.flowInitialized(flow.uid),
        createBlock: this.block.bind(this),
      });
    });
  }

  /**
   * Returns the {@link Block} associated with this `id`.
   *
   * @remarks
   * This function will return `undefined` if this {@link Dopt} instance is not initialized.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the block.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link Block} instance corresponding to the id.
   */
  public block<T>(id: string) {
    const {
      logger,
      blocksApi: { blockIntent: intent },
    } = this;

    if (!this._setup) {
      logger.error(
        'Accessing block() prior to initialization will return default block states.'
      );
    }
    const uid = this.blockUidBySid.get(id) || id;

    const block =
      blockStore.getState()[uid] || getDefaultBlockState(uid, id, -1);

    return new BlockClass<T>({
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

    if (!this._setup) {
      logger.error(
        'Accessing blocks() prior to initialization may return incomplete block states.'
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
