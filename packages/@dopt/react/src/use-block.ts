import { useContext, useCallback } from 'react';
import { DoptContext } from './context';

import { getDefaultBlockState } from '@dopt/javascript-common';

import type { Block } from '@dopt/block-types';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a block. These methods
 * have side effects (i.e., flow transitions are a function
 * of block transitions) expressed through the following
 * pseudo code:
 *
 * ```ts
 * flow.transition(blockState, intent)
 * ```
 *
 */
export interface BlockIntentions {
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
  complete: () => void;
}

/**
 * A React hook for accessing a flow's block state and
 * methods corresponding to an intent-based API for manipulating
 * said state.
 *
 * @example
 * ```tsx
 * import { useBlock } from "@dopt/react";
 * import { Modal } from "@your-company/modal";
 *
 * export function Application() {
 *   const [block, intent] = useBlock("HNWvcT78tyTwygnbzU6SW");
 *   return (
 *     <main>
 *       <Modal isOpen={block.state.active}>
 *         <h1>👏 Welcome to our app!</h1>
 *         <p>This is your onboarding experience!</p>
 *         <button onClick={intent.complete}>Close me</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param uid - {@link Block['uid']}
 * @returns [{@link Block}, {@link BlockIntentions}] the state of the block and methods to manipulate said state
 *
 */
const useBlock = (
  uid: Block['uid']
): [block: Block, intent: BlockIntentions] => {
  const { loading, blocks, blockIntention } = useContext(DoptContext);
  const complete = useCallback(
    () => !loading && blockIntention.complete(uid),
    [loading, blockIntention]
  );

  if (loading || !blocks[uid]) {
    return [getDefaultBlockState(uid), { complete }];
  }

  return [blocks[uid], { complete }];
};

export { useBlock };
