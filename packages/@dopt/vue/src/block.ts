import { Block as BlockClass } from '@dopt/javascript';
import { Ref, inject, onBeforeUnmount, ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';

import { Field, BlockIntentParams } from '@dopt/javascript-common';
type BlockTransitions = BlockIntentParams['transitions'];

export interface Block<T = unknown> {
  type: Ref<BlockClass['type']>;
  kind: Ref<BlockClass['kind']>;
  uid: Ref<BlockClass['uid']>;
  sid: Ref<BlockClass['sid']>;
  version: Ref<BlockClass['version']>;

  /**
   * The up-to-date state of this {@link Block}.
   */
  state: Ref<BlockClass['state']>;

  /**
   * Returns the up-to-date transitioned values for this {@link Block} instance.
   *
   * @example
   * ```js
   * const { transitioned } = useBlock("HNWvcT78tyTwygnbzU6SW");
   * const first = transitioned.value['first-edge'];
   * ```
   *
   * In typescript, if a block is accessed with generics:
   * ```ts
   * const { transitioned } = useBlock<['a-edge']>("HNWvcT78tyTwygnbzU6SW");
   *
   * // this is valid
   * transitioned.value['a-edge'];
   *
   * // this is invalid
   * transitioned.value['b-edge'];
   * ```
   * @returns The edges which have been transitioned for this instance.
   * If the edge exists, it's value will be true / false,
   * otherwise the value will be undefined.
   */
  transitioned: T extends BlockTransitions
    ? Ref<Record<T[number], boolean | undefined>>
    : Ref<Record<string, boolean | undefined>>;

  /**
   * Gets the field with the `name` contained by this {@link Block}.
   *
   * If {@link DoptPlugin} is loading or {@link Block} does not have a field
   * with the specified name, `undefined` is returned.
   *
   * `null` is returned when the field has been explicitly
   * configured in app.dopt.com to have an empty value.
   */
  field: Ref<<V extends Field['value']>(name: string) => V | null | undefined>;

  /**
   * Transition this block. Will also update the state of blocks within this flow, as appropriate.
   * This function must be called with at least one transition.
   *
   * @example
   * ```js
   * const block = useBlock("HNWvcT78tyTwygnbzU6SW");
   * // transitioning a single edge
   * block.transition('first-edge');
   *
   * // transitioning multiple edges
   * block.transition('second-edge', 'third-edge');
   * ```
   *
   * In typescript, if a block is accessed with generics:
   * ```ts
   * const block = useBlock<['a-edge']>("HNWvcT78tyTwygnbzU6SW");
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
  ): void;
}

export function createFieldGetter(_block: BlockClass) {
  return <T extends Field['value']>(name: string) => _block.field<T>(name);
}

export function useInitializeFields(
  ref: Ref<ReturnType<typeof createFieldGetter>>,
  _block: BlockClass
) {
  /**
   * If the block was previously an empty block (pending),
   * overwrite the field ref to trigger that it's ready.
   *
   * This ensures that users who are passing around the field function
   * can listen to changes.
   */
  if (_block.version === -1) {
    const unsubscribeBlock = _block.subscribe(() => {
      if (_block.version !== -1) {
        ref.value = createFieldGetter(_block);
        unsubscribeBlock();
      }
    });
  }
}

/**
 * A Vue composable for accessing a block's state and methods
 * corresponding to an intent-based API for manipulating
 * said block state.
 *
 * @param id - one of {@link Block['sid']} | {@link Block['uid']}
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 *
 * @returns a {@link Block} the state of the block and methods to manipulate block state
 */
export function useBlock<T = unknown>(id: BlockClass['sid']): Block<T> {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useBlock` without using DoptPlugin');
  }

  const _block = dopt.block<T>(id);

  const block: Block<T> = {
    type: ref(_block.type),
    kind: ref(_block.kind),
    uid: ref(_block.uid),
    sid: ref(_block.sid),
    version: ref(_block.version),
    state: ref(_block.state),
    transitioned: ref(
      _block.transitioned
    ) as unknown as Block<T>['transitioned'],
    transition: (
      ...input: T extends BlockTransitions
        ? [T[number], ...T[number][]]
        : BlockTransitions
    ) => _block.transition(...input),
    field: ref(createFieldGetter(_block)),
  };

  useInitializeFields(block.field, _block);

  const unsubscribeBlock = _block.subscribe(() => {
    block.type.value = _block.type;
    block.kind.value = _block.kind;
    block.uid.value = _block.uid;
    block.sid.value = _block.sid;
    block.version.value = _block.version;
    block.state.value = _block.state;
    block.transitioned.value = _block.transitioned;
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeBlock();
  });

  return block;
}
