import { useContext, useCallback, useMemo } from 'react';
import { DoptContext } from './context';

import { getDefaultSetState } from '@dopt/javascript-common';

import { Element, Set } from '@dopt/block-types';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a group. These methods
 * have side effects.
 */
export interface UnorderedGroupBlockIntentions {
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
export interface UnorderedGroupBlock extends Set {
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
   * Gets all uncompleted blocks within the group
   */
  getUncompleted: () => Element[];
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
 * @returns [{@link UnorderedGroupBlock}, {@link UnorderedGroupBlockIntentions}] the state of the block and methods to manipulate said state
 *
 */
const useUnorderedGroup = (
  uid: Set['uid']
): [block: UnorderedGroupBlock, intent: UnorderedGroupBlockIntentions] => {
  const {
    loading,
    blocks: contextBlocks,
    blockIntention,
  } = useContext(DoptContext);
  const set = useMemo(() => {
    if (loading) {
      return undefined;
    }
    return contextBlocks[uid];
  }, [loading, contextBlocks, uid]);

  if (set && set.type !== 'set') {
    throw new Error(JSON.stringify(set, null, 2));
  }
  const blocks = useMemo(() => {
    return set?.blocks || [];
  }, [loading, set, set?.blocks]);
  const complete = useCallback(
    () => !loading && blockIntention.complete(uid),
    [loading, blockIntention]
  );
  const size = set?.size || 0;
  const getCompleted = useCallback(
    () => blocks.filter((b) => b.state.completed),
    [loading, blocks]
  );
  const getUncompleted = useCallback(
    () => blocks?.filter((b) => !b.state.completed),
    [loading, blocks]
  );
  const getActive = useCallback(
    () => blocks?.filter((b) => b.state.active),
    [loading, blocks]
  );
  const getInactive = useCallback(
    () => blocks?.filter((b) => !b.state.active),
    [loading, blocks]
  );
  if (loading || !set) {
    return [
      {
        ...getDefaultSetState(uid),
        size,
        blocks,
        getCompleted,
        getUncompleted,
        getActive,
        getInactive,
      },
      {
        complete,
      },
    ];
  }
  {
    return [
      {
        ...set,
        size,
        blocks,
        getCompleted,
        getUncompleted,
        getActive,
        getInactive,
      },
      {
        complete,
      },
    ];
  }
};

export { useUnorderedGroup };
