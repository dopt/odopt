import { Logger, LoggerProps } from '@dopt/logger';

import { PKG_NAME, PKG_VERSION, URL_PREFIX, SOCKET_PREFIX } from './utils';

import { Block as BlockClass, BlockProps } from './block';
import { Flow as FlowClass } from './flow';
import { Modal as ModalClass } from './modal';
import { Card as CardClass } from './card';
import {
  ChecklistItem as ChecklistItemClass,
  Checklist as ChecklistClass,
} from './checklist';
import { HintsItem as HintsItemClass, Hints as HintsClass } from './hints';
import { TourItem as TourItemClass, Tour as TourClass } from './tour';

import {
  blocksApi,
  getDefaultBlockState,
  getDefaultFlowState,
  setupSocket,
  Flow,
  Block,
  Field,
  FlowParams,
  FlowIntentParams,
  BlockIntentParams,
} from '@dopt/javascript-common';

import { Socket } from 'socket.io-client';

import { Blocks, createBlockStore, createFlowStore } from './store';

type PromiseWithResolver = {
  promise: Promise<boolean>;
  resolver: (status: boolean) => void;
  resolved: () => boolean;
};

function createPromiseWithResolver(): PromiseWithResolver {
  let _resolver: PromiseWithResolver['resolver'];
  let _resolved = false;

  return {
    promise: new Promise((resolve) => {
      _resolver = resolve;
    }),
    resolver: function (status: boolean) {
      _resolver(status);
      _resolved = true;
    },
    resolved: () => _resolved,
  };
}

/**
 * Providing this configuration to {@link Dopt} allows the
 * the SDK to fetch relevant data from the Dopt blocks API.
 */
export interface DoptConfig {
  /**
   * The userId you're fetching block and flows for.
   * If undefined, Dopt will not initialize.
   * Instead, it will wait for a `configure({ userId })` call
   * where a userId is passed in.
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
   *
   * The versions can be a number (a fixed version),
   * "uncommitted" which references the uncommitted version in Dopt,
   * or "latest" which references the most recently created version in Dopt.
   *
   * @remarks
   * **⚠️ Warning ⚠️**: Using either "uncommitted" or "latest" will cause
   * updates made in Dopt to be reflected in the provider upon window reload
   * without needing to update or deploy code.
   *
   * @example
   * ```js
   * {
   *   "welcome-to-dopt": 3,
   *   "test-flow": "uncommitted",
   *   "feature-announcements": "latest",
   * };
   * ```
   *
   */
  flowVersions: Record<string, FlowParams['version']>;
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
  private _socketPromise: PromiseWithResolver;
  private _flowsPromise: PromiseWithResolver;
  private _registeredFlowPromises: Map<Flow['sid'], PromiseWithResolver>;

  private logger: Logger;
  private blocksApi: ReturnType<typeof blocksApi> | undefined;
  private flowBlocks: Map<Flow['sid'], Block['uid'][]>;
  private blockFields: Map<Block['uid'], Map<Field['sid'], Field>>;
  private socket: Socket | undefined;
  private blockUidBySid: Map<Block['sid'], Block['uid']>;

  private blockStore: ReturnType<typeof createBlockStore>;
  private flowStore: ReturnType<typeof createFlowStore>;

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

    // optimisticUpdates defaults to true
    this.optimisticUpdates =
      optimisticUpdates === false ? optimisticUpdates : true;

    this.logger = new Logger({ logLevel, prefix: ` ${PKG_NAME} ` });

    this.flowBlocks = new Map();
    this.blockUidBySid = new Map();
    this.blockFields = new Map();

    this.blockStore = createBlockStore();
    this.flowStore = createFlowStore();

    this._registeredFlowPromises = new Map();

    this._setup = false;

    this._socketPromise = createPromiseWithResolver();
    this._flowsPromise = createPromiseWithResolver();

    this.configure({ userId, groupId, flowVersions });

    Promise.all([this._socketPromise.promise, this._flowsPromise.promise]).then(
      () => (this._setup = true)
    );
  }

  /**
   * Resolves to `true` when this Dopt instance has been intiailized.
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
    await Promise.all([
      this._socketPromise.promise,
      this._flowsPromise.promise,
    ]);

    return true;
  }

  private registerFlowPromise(sid: Flow['sid']): PromiseWithResolver {
    let flowPromise = this._registeredFlowPromises.get(sid);
    if (!flowPromise) {
      flowPromise = createPromiseWithResolver();
      this._registeredFlowPromises.set(sid, flowPromise);
    }

    return flowPromise;
  }

  private async flowInitialized(sid: Flow['sid']): Promise<boolean> {
    return this.registerFlowPromise(sid).promise;
  }

  /**
   * Configures a Dopt instance with new properties. For example, if you didn't pass in a userId
   * initially, you can use this method to configure Dopt to your user.
   *
   * @remarks
   * Before using a Dopt instance, check whether the instance has been {@link Dopt.initialized}.
   *
   * @example
   * ```js
   * dopt.configure({
   *   userId: "<MY USER'S ID>",
   * });
   * ```
   *
   * @param config - a partial {@link DoptConfig}, it only accepts `userId`, `groupId`, and `flowVersions` attributes.
   *
   * @returns A promise which resolves once the configuration is complete.
   * However, you should not rely on this promise since there may be side effects which won't resolve before promise completion.
   * Instead, rely on `dopt.initialized` to evaluate whether configuration is complete.
   */
  async configure(
    config: Partial<Pick<DoptConfig, 'userId' | 'groupId' | 'flowVersions'>>
  ): Promise<void> {
    // Merge any updated properties into the instance
    Object.assign(this, config);

    const { apiKey, userId, groupId, flowVersions, logger } = this;

    let proceed = true;

    if (flowVersions == null || Object.keys(flowVersions).length === 0) {
      logger.error(
        'The `flowVersions` prop is undefined or empty. The SDK will be pending initialization and will return defaults for flows and blocks until you call `configure` with a defined and valid `flowVersions` attribute.'
      );

      proceed = false;
    }

    if (userId == null) {
      logger.error(
        'The `userId` prop is undefined. The SDK will be pending initialization and will return defaults for flows and blocks until you call `configure` with a defined `userId` attribute.'
      );

      proceed = false;
    }

    if (groupId == null) {
      logger.info(
        "The `groupId` prop is undefined. The SDK won't be able to target any entry conditions which use groups properties. You can call `configure` with a defined `groupId` attribute to reinitialize the SDK."
      );
    }

    if (!proceed) {
      return;
    }

    /**
     * Clean up any pre-configured objects that might already exist
     */
    this.destroy();

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
      urlPrefix: SOCKET_PREFIX,
      groupId,
    });

    this.socket?.on('blocks', (blocks: Blocks) => {
      this.blockStore.setState(blocks);
    });

    this.socket?.on('flow', (flow: Flow) => {
      this.flowStore.setState(() => ({
        [flow.sid]: flow,
      }));
    });

    this.socket?.on('ready', () => {
      if (!this._socketPromise.resolved()) {
        /**
         * If the socketPromise hasn't been resolved previously,
         * this is the first time the socket is ready after init.
         * As flows are loaded, they will individually 'watch:flow' events.
         */
        this._socketPromise && this._socketPromise.resolver(true);
      } else {
        /**
         * Else, we've already initialized and we're instead
         * reconnecting because the socket lost its connection.
         * In the reconnection case, we should emit 'watch:flow' events
         * based on the flowStore.
         */
        Object.values(this.flowStore.getState()).forEach((flow) => {
          if (flow.version !== -1) {
            this.socket?.emit('watch:flow', flow.sid, flow.version);
          }
        });
      }
    });

    Promise.all(
      Object.entries(flowVersions).map(async ([sid, tag]): Promise<void> => {
        const _flowPromise = this.registerFlowPromise(sid);

        if (this.blocksApi == null) {
          logger.error(
            `Didn't fetch flow '${sid}' at version ${tag} because the API client was unavailable`
          );
          _flowPromise.resolver(false);
          return;
        }

        let flow: Flow;

        try {
          flow = await this.blocksApi.getFlow({ sid, version: tag });
        } catch (e) {
          logger.error(`Failed to fetch flow '${sid}' at version ${tag}`, e);
          _flowPromise.resolver(false);
          return;
        }

        // watch this flow over the socket once the socket is ready
        this._socketPromise.promise.then(() => {
          if (flow.version !== -1) {
            this.socket?.emit('watch:flow', flow.sid, flow.version);
          }
        });

        this.flowBlocks.set(flow.sid, flow.blocks?.map(({ uid }) => uid) || []);

        flow.blocks?.forEach((block) => {
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

        /**
         * Initialize the flowStore and blockStore last.
         * These initializations trigger downstream events
         * in scenarios where someone has called `dopt.flow`
         * or `dopt.block` before those objects are initialized.
         */
        // initialize the flow store
        this.flowStore.setState(() => ({
          [flow.sid]: flow,
        }));

        /**
         * Initialize all blocks in this flow at once
         * so that it doesn't trigger event listeners
         * serially.
         */
        this.blockStore.setState(
          (flow.blocks || []).reduce((acc, block) => {
            acc[block.uid] = block;
            return acc;
          }, {} as Record<string, Block>)
        );

        _flowPromise.resolver(flow.version !== -1);
      })
    ).then(() => {
      /**
       * If there are registered promises, they will:
       * - already be resolved above (the flow loaded or failed)
       * - they will correspond to a flow that wasn't included and so should fail
       *
       * Resolving an already resolved promise will not cause an error
       */
      for (const { resolver } of this._registeredFlowPromises.values()) {
        resolver(false);
      }

      this._flowsPromise.resolver(true);
    });
  }

  /**
   * Returns the {@link Flow} associated with the given `id` and `version`.
   *
   * @example
   * ```js
   * const flow = dopt.flow("welcome-to-dopt");
   * ```
   *
   * @param uid {@link Flow['uid']} The id of the flow.
   *
   * @returns A {@link Flow} instance which matches the given `id`.
   */
  flow(sid: Flow['sid']) {
    const { flowBlocks } = this;

    const flow = this.flowStore.getState()[sid] || getDefaultFlowState(sid, -1);

    const intent = async (options: FlowIntentParams) => {
      if (this.blocksApi) {
        return this.blocksApi.flowIntent(options);
      }

      return false;
    };

    return new FlowClass({
      intent,
      flow,
      flowBlocks,
      flowPromise: this.flowInitialized(sid),
      createBlock: this.block.bind(this),
      flowStore: this.flowStore,
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
  flows() {
    const { logger, flowBlocks } = this;

    const intent = async (options: FlowIntentParams) => {
      if (this.blocksApi) {
        return this.blocksApi.flowIntent(options);
      }

      return false;
    };

    if (!this._setup) {
      logger.warn(
        'Accessing flows() prior to initialization will not return all flows. Check `dopt.initialized()`.'
      );
    }

    return Object.values(this.flowStore.getState()).map((flow) => {
      return new FlowClass({
        intent,
        flow,
        flowBlocks,
        flowPromise: this.flowInitialized(flow.sid),
        createBlock: this.block.bind(this),
        flowStore: this.flowStore,
      });
    });
  }

  /**
   * Returns the {@link Block} associated with this `id`.
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
  block<T>(id: string) {
    return this._block<BlockClass<T>>(id, (props) => new BlockClass<T>(props));
  }

  private _block<C extends BlockClass>(
    id: string,
    creator: (_: BlockProps) => C
  ) {
    const intent = async (options: BlockIntentParams) => {
      if (this.blocksApi) {
        return this.blocksApi.blockIntent(options);
      }

      return false;
    };

    const uid = this.blockUidBySid.get(id) || id;
    const block =
      this.blockStore.getState()[uid] || getDefaultBlockState(uid, id, -1);

    return creator({
      intent,
      block,
      optimisticUpdates: this.optimisticUpdates,
      blockFields: this.blockFields,
      blockUidBySid: this.blockUidBySid,
      blockStore: this.blockStore,
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
  blocks() {
    const { logger } = this;

    const intent = async (options: BlockIntentParams) => {
      if (this.blocksApi) {
        return this.blocksApi.blockIntent(options);
      }

      return false;
    };

    if (!this._setup) {
      logger.info(
        'Accessing blocks() prior to initialization will not return all blocks. Check `dopt.initialized()`.'
      );
    }

    return Object.entries(this.blockStore.getState()).map(([, block]) => {
      return new BlockClass({
        intent,
        block,
        optimisticUpdates: this.optimisticUpdates,
        blockFields: this.blockFields,
        blockUidBySid: this.blockUidBySid,
        blockStore: this.blockStore,
      });
    });
  }

  /**
   * Returns the {@link Modal} associated with this `id`.
   *
   * @example
   * ```js
   * const modal = dopt.modal("flow-one.my-modal");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link Modal} instance corresponding to the id.
   */
  modal(id: string) {
    return this._block<ModalClass>(id, (props) => new ModalClass(props));
  }

  /**
   * Returns the {@link Card} associated with this `id`.
   *
   * @example
   * ```js
   * const card = dopt.card("flow-one.my-card");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the card.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link Card} instance corresponding to the id.
   */
  card(id: string) {
    return this._block<CardClass>(id, (props) => new CardClass(props));
  }

  /**
   * Returns the {@link Checklist} associated with this `id`.
   *
   * @example
   * ```js
   * const checklist = dopt.checklist("flow-two.my-checklist");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link Checklist} instance corresponding to the id.
   */
  checklist(id: string) {
    return this._block<ChecklistClass>(
      id,
      (props) =>
        new ChecklistClass({
          ...props,
          createBlock: this._block.bind(this),
        })
    );
  }

  /**
   * Returns the {@link ChecklistItem} associated with this `id`.
   *
   * @example
   * ```js
   * const checklistItem = dopt.checklistItem("flow-two.my-checklist-item");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the checklist item.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link ChecklistItem} instance corresponding to the id.
   */
  checklistItem(id: string) {
    return this._block<ChecklistItemClass>(
      id,
      (props) => new ChecklistItemClass(props)
    );
  }

  /**
   * Returns the {@link Hints} associated with this `id`.
   *
   * @example
   * ```js
   * const hints = dopt.hints("flow-two.my-hints");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link Hints} instance corresponding to the id.
   */
  hints(id: string) {
    return this._block<HintsClass>(
      id,
      (props) =>
        new HintsClass({
          ...props,
          createBlock: this._block.bind(this),
        })
    );
  }

  /**
   * Returns the {@link HintsItem} associated with this `id`.
   *
   * @example
   * ```js
   * const hintsItem = dopt.hintsItem("flow-two.my-hints-item");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the hints item.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link HintsItem} instance corresponding to the id.
   */
  hintsItem(id: string) {
    return this._block<HintsItemClass>(
      id,
      (props) =>
        new HintsItemClass({
          ...props,
          hints: () => {
            const uid = this.blockUidBySid.get(id) || id;
            const block = this.blockStore.getState()[uid] || props.block;

            if (!block.containerUid) {
              return undefined;
            }

            return this.hints(block.containerUid);
          },
        })
    );
  }

  /**
   * Returns the {@link Tour} associated with this `id`.
   *
   * @example
   * ```js
   * const tour = dopt.tour("flow-three.my-tour");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link Tour} instance corresponding to the id.
   */
  tour(id: string) {
    return this._block<TourClass>(
      id,
      (props) =>
        new TourClass({
          ...props,
          createBlock: this._block.bind(this),
        })
    );
  }

  /**
   * Returns the {@link TourItem} associated with this `id`.
   *
   * @example
   * ```js
   * const tourItem = dopt.tourItem("flow-three.my-tour-item");
   * ```
   *
   * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the checklist item.
   * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
   * @returns A {@link TourItem} instance corresponding to the id.
   */
  tourItem(id: string) {
    return this._block<TourItemClass>(
      id,
      (props) =>
        new TourItemClass({
          ...props,
          tour: () => {
            const uid = this.blockUidBySid.get(id) || id;
            const block = this.blockStore.getState()[uid] || props.block;

            if (!block.containerUid) {
              return undefined;
            }

            return this.tour(block.containerUid);
          },
        })
    );
  }

  /**
   * Closes this instance's internal socket connection.
   *
   * @remarks
   * You may want to do this when a component (or set of components)
   * which depends on this instance is being unmounted and you don't
   * want to leak an open socket connection.
   */
  destroy() {
    this.socket?.close();
  }
}
