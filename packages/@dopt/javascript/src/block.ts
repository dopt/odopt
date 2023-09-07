import {
  blocksApi,
  Block as BlockType,
  Field,
  BlockIntentParams,
} from '@dopt/javascript-common';
import { createBlockStore } from './store';

type BlockTransitions = BlockIntentParams['transitions'];

/**
 * @internal
 */
export interface BlockProps {
  intent: ReturnType<typeof blocksApi>['blockIntent'];
  block: BlockType;
  optimisticUpdates: boolean;
  blockFields: Map<BlockType['uid'], Map<Field['sid'], Field>>;
  blockUidBySid: Map<BlockType['sid'], BlockType['uid']>;
  blockStore: ReturnType<typeof createBlockStore>;
}

export class Block<T = unknown> {
  private intentApi: BlockProps['intent'];
  private blockFields: BlockProps['blockFields'];
  private optimisticUpdates: BlockProps['optimisticUpdates'];

  protected resolveInternalBlock: () => BlockType;
  protected blockStore: BlockProps['blockStore'];

  /**
   * @internal
   */
  constructor({
    block,
    intent,
    optimisticUpdates,
    blockFields,
    blockUidBySid,
    blockStore,
  }: BlockProps) {
    this.intentApi = intent;
    this.optimisticUpdates = optimisticUpdates;
    this.blockFields = blockFields;
    this.blockStore = blockStore;

    this.resolveInternalBlock = () => {
      const uid = blockUidBySid.get(block.sid) || block.uid;
      /**
       * To obtain the underlying, non-proxied block, we try to use the blockStore.
       *
       * If unavailable, i.e. the block hasn't loaded or has errored,
       * we use the static block instead.
       */
      return blockStore.getState()[uid] || block;
    };
  }

  /**
   * Gets the field with the `name` contained by this {@link Block}.
   *
   * If {@link Dopt} is loading or {@link Block} does not have a field
   * with the specified name, `undefined` is returned.
   *
   * `null` is returned when the field has been explicitly
   * configured in app.dopt.com to have an empty value.
   */
  field<V extends Field['value']>(name: string): V | null | undefined {
    const fieldMap = this.blockFields.get(this.uid);

    /**
     * If:
     * - a Block doesn't have fields (Dopt is still loading)
     * - a Block doesn't have the specified field
     * we return `undefined`.
     */
    if (fieldMap == null || !fieldMap.has(name)) {
      return undefined;
    }

    /**
     * We return `null` for a value if
     * that value has been explicitly configured in
     * Dopt to not have a value.
     */
    const { value } = fieldMap.get(name) ?? { value: null };

    return value == null ? (value as null) : (value as V);
  }

  get type() {
    return this.resolveInternalBlock().type;
  }

  get kind() {
    return this.resolveInternalBlock().kind;
  }

  get sid() {
    return this.resolveInternalBlock().sid;
  }

  get uid() {
    return this.resolveInternalBlock().uid;
  }

  get version() {
    return this.resolveInternalBlock().version;
  }

  /**
   * Returns the up-to-date state of this {@link Block} instance.
   *
   * @returns The state of this instance.
   */
  get state(): BlockType['state'] {
    return this.resolveInternalBlock().state;
  }

  /**
   * Returns the up-to-date transitioned values for this {@link Block} instance.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * const firstTransitioned = block.transitioned['first-edge'];
   * ```
   *
   * In typescript, if a block is accessed with generics:
   * ```ts
   * const block = dopt.block<['a-edge']>("HNWvcT78tyTwygnbzU6SW");
   *
   * // this is valid
   * block.transitioned['a-edge'];
   *
   * // this is invalid
   * block.transitioned['b-edge'];
   * ```
   * @returns The edges which have been transitioned for this instance.
   * If the edge exists, it's value will be true / false,
   * otherwise the value will be undefined.
   */
  get transitioned(): T extends BlockTransitions
    ? Record<T[number], boolean | undefined>
    : Record<string, boolean | undefined> {
    // overwrite the type of transitioned using generics
    return this.resolveInternalBlock().transitioned as Block<T>['transitioned'];
  }

  /**
   * Transition this block. Will also update the state of blocks within this flow, as appropriate.
   * This function must be called with at least one transition.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * // transitioning a single edge
   * block.transition('first-edge');
   *
   * // transitioning multiple edges
   * block.transition('second-edge', 'third-edge');
   * ```
   *
   * In typescript, if a block is accessed with generics:
   * ```ts
   * const block = dopt.block<['a-edge']>("HNWvcT78tyTwygnbzU6SW");
   *
   * // this is valid
   * block.transition('a-edge');
   *
   * // this is invalid
   * block.transition('b-edge');
   * ```
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  transition(
    ...input: T extends BlockTransitions
      ? [T[number], ...T[number][]]
      : BlockTransitions
  ) {
    const { uid, sid, version } = this;

    const storedBlock = this.blockStore.getState()[uid];

    if (storedBlock) {
      this.intentApi({ uid, sid, version, transitions: input });

      if (this.optimisticUpdates && storedBlock.state.active) {
        this.blockStore.setState({
          [uid]: {
            ...storedBlock,
            state: {
              entered: true,
              exited: true,
              active: false,
            },
          },
        });
      }
    }
  }

  /**
   * Subscribe to changes on this block.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * const unsubscribe = block.subscribe(async (block: Block) => {
   *  if (block.state.exited) {
   *     await showModal("Yay, you've completed your first step!");
   *     unsubscribe();
   *  }
   * });
   * ```
   *
   * @param listener
   * The listener function is called with this {@link Block} instance.
   *
   * @returns A function which can be called to unsubscribe the listener.
   */
  subscribe(listener: (block: Block<T>) => void) {
    return this.blockStore.subscribe(
      (blocks) => blocks[this.uid],
      () => listener(this)
    );
  }
}
