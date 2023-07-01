import { LoggerProps } from '@dopt/logger';
import { ReactNode } from 'react';
import type {
  Flow as APIFlow,
  FlowIntentParams,
  Block as APIBlock,
  BlockIntentParams,
  Field as APIField,
} from '@dopt/javascript-common';

/**
 * This type maps a Block's `uid` to the Block itself.
 *
 * This object is used internally within the {@link DoptProvider}.
 */
export type Blocks = Record<APIBlock['uid'], APIBlock>;

export type BlockTransitionInputs = BlockIntentParams['transitions'];

export type BlockTransitionHandler = (
  uid: APIBlock['uid'],
  transitions: BlockTransitionInputs
) => void | undefined;

/**
 * This type maps a Flow's `sid` to the Flow itself.
 *
 * This object is used internally within the {@link DoptProvider}.
 */
export type Flows = Record<APIFlow['sid'], APIFlow>;

export type FlowIntentHandler = Record<
  FlowIntentParams['intent'],
  (sid: APIFlow['sid'], version: APIFlow['version']) => void | undefined
>;

/**
 * This type encapsulates Flow initialization status.
 * When a Flow is first fetched by Dopt, it will be in the pending state
 * (`pending: true`). Dopt will then evaluate whether a user qualifies
 * for a flow and if any state updates need to occur. When those are complete,
 * the status will be updated to `pending: false`. If any errors occur during
 * this process, the status will be additionally be updated to `failed: true`.
 */
export type FlowStatus = { pending: boolean; failed: boolean };

/**
 * Providing this configuration to the {@link DoptProvider} allows the
 * the SDK to fetch relevant data from the Dopt blocks API.
 */
export interface ProviderConfig {
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
   * A boolean which defines whether transitions on step blocks should
   * optimistically update the client before hearing back that the change
   * has been committed.
   *
   * Within {@link DoptProvider}, this defaults to `true`.
   */
  optimisticUpdates?: boolean;
  /**
   * The children React elements of the DoptProvider.
   */
  children?: ReactNode;
}

export interface Field {
  sid: APIField['sid'];
  value: APIField['value'];
}

export interface Block<T = unknown> {
  type: APIBlock['type'];
  kind: APIBlock['kind'];
  uid: APIBlock['uid'];
  sid: APIBlock['sid'];
  version: APIBlock['version'];
  /**
   * The up-to-date state of this {@link Block} instance.
   */
  state: APIBlock['state'];
  /**
   * A function correspond to an intent-based API for
   * signaling state transitions on a block. This function
   * has side effects: it changes the state of other blocks
   * and the flow as well. For example, transitioning a block
   * activates the next block and transitioning the last block
   * finishes a flow.
   */
  transition: BlockTransition<T>;
  /**
   * The up-to-date transitioned values for this {@link Block} instance.
   *
   * Contains the edges which have been transitioned for this instance.
   * If the edge exists, it's value will be true / false,
   * otherwise the value will be undefined.
   *
   * @example
   * ```js
   * const [block] = useBlock("HNWvcT78tyTwygnbzU6SW");
   * const firstTransitioned = block.transitioned['first-edge'];
   * ```
   *
   * In typescript, if a block is accessed with generics:
   * ```ts
   * const [block] = useBlock<['a-edge']>("HNWvcT78tyTwygnbzU6SW");
   *
   * // this is valid
   * block.transitioned['a-edge'];
   *
   * // this is invalid
   * block.transitioned['b-edge'];
   * ```
   */
  transitioned: T extends BlockTransitionInputs
    ? Record<T[number], boolean | undefined>
    : Record<string, boolean | undefined>;
  /**
   * Gets the field (see {@link Field['value']}) with the `name`
   * (see {@link Field['sid']}) contained by this {@link Block}.
   *
   * If Dopt is loading or {@link Block} does not have a field
   * with the specified name, `undefined` is returned.
   *
   * `null` is returned when the field has been explicitly
   * configured in app.dopt.com to have an empty value.
   */
  field: <V extends Field['value']>(name: string) => V | null | undefined;
  /**
   * If a block is contained within another block, for example
   * a "checklistItem" within a "checklist", this property
   * will point to the parent "checklist" block's uid.
   *
   * Otherwise, this property will be undefined.
   */
  containerUid?: APIBlock['containerUid'];
}

/**
 * A function correspond to an intent-based API for
 * signaling state transitions on a block. This function
 * has side effects: it changes the state of other blocks
 * and the flow as well. For example, transitioning a block
 * activates the next block and transitioning the last block
 * finishes a flow.
 *
 * Calling the transition signals that the experience the
 * {@link Block} powers has finished. A noop if the {@link Block}
 * isn't active.
 *
 * @example
 * ```js
 * const [, transition] = useBlock("HNWvcT78tyTwygnbzU6SW");
 * // transitioning a single edge
 * transition('first-edge');
 *
 * // transitioning multiple edges
 * transition('second-edge', 'third-edge');
 * ```
 *
 * In typescript, if a block is accessed with generics:
 * ```ts
 * const [, transition] = useBlock<['a-edge']>("HNWvcT78tyTwygnbzU6SW");
 *
 * // this is valid
 * transition('a-edge');
 *
 * // this is invalid
 * transition('b-edge');
 * ```
 *
 * @modifies
 * Sets {@link Block['state']['exited']} to true
 * Sets {@link Block['state']['active']} to false
 */
export type BlockTransition<T> = (
  ...inputs: T extends BlockTransitionInputs
    ? [T[number], ...T[number][]]
    : BlockTransitionInputs
) => void | undefined;

export interface Flow {
  type: APIFlow['type'];
  kind: APIFlow['kind'];
  uid: APIFlow['uid'];
  sid: APIFlow['sid'];
  version: APIFlow['version'];
  /**
   * The up-to-date state of this {@link Flow} instance.
   */
  state: APIFlow['state'];
  /**
   * Accessing blocks directly from a flow doesn't permit type-safety for block.transitioned.
   */
  blocks: Block[];
}

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a flow. These methods
 * have side effects on {@link Block['state']} contained
 * within the flow.
 */
export interface FlowIntent {
  /**
   * Resets the flow's state and all of its
   * associated blocks and their state to the
   * original/default state.
   *
   * @modifies
   *
   * Sets {@link Flow['state']['stopped']} to false
   * Sets {@link Flow['state']['finished']} to false
   * Sets {@link Flow['state']['started']} to false
   * Sets all {@link Block['state']['active']} to false
   * Sets all {@link Block['state']['finished']} to false
   */
  reset: () => void | undefined;
  /**
   * Stops the flow.
   *
   * @modifies
   * Sets {@link Flow['state']['stopped']} to true
   * Sets all {@link Block['state']['active']} to false
   */
  stop: () => void | undefined;
  /**
   * Finishes the flow, independent of
   * exited states that might be derived from
   * its {@link Block[]}.
   *
   * @modifies
   * Sets {@link Flow['state']['finished']} to true
   * Sets all {@link Block['state']['active']} to false
   */
  finish: () => void | undefined;
}

/**
 * A container is a block which encapsulates other blocks.
 * For example, a "checklist" encapsulates its children.
 *
 * A container extends {@link Block} and has all the
 * properties that a block has. Calling the transition
 * function on the container transitions the parent block.
 *
 * A container also has children which are also of type
 * {@link Block} and are contained within the parent block.
 * These children all have {@link Block['containerUid']}
 * pointing to the parent's {@link Block['uid']}.
 */
export interface Container extends Block {
  /**
   * Accessing children directly from a container doesn't permit type-safety for block.transitioned.
   */
  children: Block[];
}
