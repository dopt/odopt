import {
  blocksApi,
  Block as BlockType,
  Field,
  BlockIntentParams,
} from '@dopt/javascript-common';

import { blockStore } from './store';

function resolveBlock(block: BlockType): BlockType {
  return blockStore.getState()[block.uid] || block;
}

type BlockTransitions = BlockIntentParams['transitions'];

/**
 * @internal
 */
export interface BlockProps {
  intent: ReturnType<typeof blocksApi>['blockIntent'];
  block: BlockType;
  optimisticUpdates: boolean;
  fieldMap: Map<Field['sid'], Field> | null;
}

export class Block<T> {
  private intent: BlockProps['intent'];
  private block: BlockProps['block'];
  private fieldMap: BlockProps['fieldMap'];
  private optimisticUpdates: BlockProps['optimisticUpdates'];

  /**
   * @internal
   */
  constructor({ block, intent, optimisticUpdates, fieldMap }: BlockProps) {
    this.intent = intent;
    this.block = block;
    this.optimisticUpdates = optimisticUpdates;
    this.fieldMap = fieldMap;
  }

  /**
   * Gets the field with the `name` contained by this {@link Block}.
   * If the {@link Block} does not have the field, the `defaultValue`
   * is returned if provided. Otherwise, `null` is returned.
   */
  field<V extends Field['value']>(name: string, defaultValue?: V): V | null {
    if (this.fieldMap == null) {
      return null;
    }

    const value = this.fieldMap.get(name)?.value;

    return value != null
      ? (value as V)
      : defaultValue != null
      ? defaultValue
      : null;
  }

  get type() {
    return this.block.type;
  }

  get kind() {
    return this.block.kind;
  }

  get uid() {
    return this.block.uid;
  }

  get sid() {
    return this.block.sid;
  }

  get version() {
    return this.block.version;
  }

  /**
   * Returns the up-to-date state of this {@link Block} instance.
   *
   * @returns The state of this instance.
   */
  get state(): BlockType['state'] {
    return resolveBlock(this.block).state;
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
    return resolveBlock(this.block).transitioned as Block<T>['transitioned'];
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
    if (this.optimisticUpdates) {
      const storedBlock = blockStore.getState()[this.block.uid];
      blockStore.setState({
        [this.block.uid]: {
          ...storedBlock,
          state: { active: false, exited: true, entered: true },
        },
      });
    }

    const { uid, sid, version } = this.block;
    this.intent({ uid, sid, version, transitions: input });
  }

  /**
   * Subscribe to changes on this block.
   *
   * @example
   * ```js
   * const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * const unsubscribe = block.subscribe(async blockData => {
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
    return blockStore.subscribe(
      (blocks) => blocks[this.block.uid],
      () => listener(this)
    );
  }
}
