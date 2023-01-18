import { Set, Element } from '@dopt/block-types';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a group. These methods
 * have side effects.
 */
export interface BlockIntentions {
  /**
   * Signals that the experience this {@link Set} powers has
   * finished. A noop if the {@link Block} isn't active. Results
   * in a flow transition.
   *
   * @modifies
   *
   * Sets {@link Block['state']['completed']} to true
   * Sets {@link Block['state']['active']} to false
   */
  complete: () => void;
}
interface Group extends Set {
  /**
   * Data accessors specific to groups
   *
   * The number of blocks within the group
   */
  size: number;
  /**
   * An array of all the blocks within the group
   */
  blocks: Element[];
  /**
   * Gets all completed blocks within the group
   */
  getCompleted: () => Element[];
  /**
   * Gets all incompleted blocks within the group
   */
  getIncomplete: () => Element[];
  /**
   * Gets all active blocks within the group
   */
  getActive: () => Element[];
  /**
   * Gets all inactive blocks within the group
   */
  getInactive: () => Element[];
}

/**
 * A React hook for accessing a flow's group block state and
 * methods corresponding to an intent-based API for manipulating
 * said state.
 *
 * @example
 * ```tsx
 * export function Application() {
 *   const [group, groupIntent] = useUnorderedGroup("HNWvcT78tyTwygnbzU6SW");
 *   const [block, blockIntent] = useBlock("HJDdinfT60yywdls893");
 *
 *   return (
 *     <main>
 *       <Modal isOpen={block.state.active}>
 *         <h1>👏 Welcome to our app!</h1>
 *         <p>This is your onboarding experience!</p>
 *         <p>You are on step {group.getCompleted() + 1}</p>
 *         <button onClick={blockIntent.complete}>Next</button>
 *         <button onClick={groupIntent.complete}>Exit</button>
 *       </Modal>
 *     </main>
 *   );
 *  }
 * ```
 *
 * @param uid - {@link Set['uid']}
 * @returns [{@link Set}, {@link context.BlockIntentions}] the state of the block and methods to manipulate said state
 *
 */
const useUnorderedGroup = (
  uid: Set['uid']
): [block: Group, intent: BlockIntentions] => {
  throw new Error('Not Implemented');
};

export { useUnorderedGroup };
