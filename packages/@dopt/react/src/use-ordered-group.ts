import { useContext, useCallback, useMemo } from 'react';
import { DoptContext } from './context';

import { getDefaultSetState } from '@dopt/javascript-common';

import { Element, Set } from '@dopt/block-types';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of an ordered group.
 * These methods have side effects.
 */
export interface OrderedGroupBlockIntentions {
  /**
   * Signals that the experience this {@link Block} powers has
   * finished. A noop if the {@link Block} isn't active. Results
   * in a flow transition.
   *
   * @modifies
   *
   * Sets {@link Block['state']['completed']} to true
   * Sets {@link Block['state']['active']} to false
   */
  complete: () => void | undefined;
  /**
   * Goes to specified element in the group
   *
   * @modifies
   *
   * Sets {@link Block['state']['active']} to false for the currently active block
   * Sets {@link Block['state']['active']} to true for the specified block
   */
  goTo: (index: number) => void | undefined;
  /**
   * progresses the group by a single element.
   *
   * @modifies
   *
   * Sets {@link Block['state']['active']} to false for the currently active block
   * Sets {@link Block['state']['complete']} to true for the currently active block
   * Sets {@link Block['state']['active']} to true for the next block
   */
  next: () => void | undefined;

  /**
   * Goes back one element in the group.
   *
   * @modifies
   *
   * Sets {@link Block['state']['active']} to false for the currently active block
   * Sets {@link Block['state']['active']} to true for the previous block
   */
  prev: () => void | undefined;
}

/**
 * Methods corresponding to the API for data retrieval
 * of an ordered group's properties.
 */
export interface OrderedGroupBlock extends Set {
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
 *   const [group, groupIntent] = useOrderedGroup("HNWvcT78tyTwygnbzU6SW");
 *   const [block, blockIntent] = useBlock("HJDdinfT60yywdls893");
 *
 *   return (
 *     <main>
 *       <Modal isOpen={block.state.active}>
 *         <h1>👏 Welcome to our app!</h1>
 *         <p>This is your onboarding experience!</p>
 *         <p>You are on step {group.getCompleted() + 1}</p>
 *         <button onClick={group.next}>Next</button>
 *         <button onClick={groupIntent.complete}>Exit</button>
 *       </Modal>
 *     </main>
 *   );
 *  }
 * ```
 *
 * @param uid - {@link Set['uid']}
 * @returns [{@link OrderedGroupBlock}, {@link OrderedGroupBlockIntentions}] the state of the block and methods to manipulate said state
 *
 */
const useOrderedGroup = (
  uid: Set['uid']
): [block: OrderedGroupBlock, intent: OrderedGroupBlockIntentions] => {
  const {
    fetching,
    blocks: contextBlocks,
    blockIntention,
    log,
  } = useContext(DoptContext);
  const set = useMemo(() => {
    if (fetching) {
      return undefined;
    }
    return contextBlocks[uid];
  }, [fetching, contextBlocks, uid]);

  if (set && set.type !== 'set') {
    throw new Error(JSON.stringify(set, null, 2));
  }
  const blocks = useMemo(() => {
    if (fetching) {
      return [];
    }
    return set?.blocks || [];
  }, [fetching, set, set?.blocks]);
  const complete = useCallback(() => {
    if (!fetching) {
      blockIntention.complete(uid);
    }
  }, [fetching, blockIntention]);
  const prev = useCallback(() => {
    if (!fetching) {
      blockIntention.prev(uid);
    }
  }, [fetching, blockIntention]);
  const next = useCallback(() => {
    if (!fetching) {
      blockIntention.next(uid);
    }
  }, [fetching, blockIntention]);
  const goTo = useCallback(
    (index: number) => {
      if (!fetching) {
        blockIntention.goTo(uid, blocks[index].uid);
      }
    },
    [fetching, blockIntention, blocks]
  );
  const size = set?.size || 0;
  const getCompleted = useCallback(
    () => blocks.filter((b) => b.state.completed),
    [fetching, blocks]
  );
  const getUncompleted = useCallback(
    () => blocks?.filter((b) => !b.state.completed),
    [fetching, blocks]
  );
  const getActive = useCallback(
    () => blocks?.filter((b) => b.state.active),
    [fetching, blocks]
  );
  const getInactive = useCallback(
    () => blocks?.filter((b) => !b.state.active),
    [fetching, blocks]
  );
  if (fetching) {
    log.info(
      'Accessing block prior to initialization will return default block states.'
    );
  }
  if (fetching || !set) {
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
        prev,
        next,
        goTo,
      },
    ];
  }
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
      prev,
      next,
      goTo,
    },
  ];
};

export { useOrderedGroup };
