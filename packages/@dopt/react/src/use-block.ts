import { useContext, useCallback } from 'react';
import { DoptContext } from './context';

import { Block, getBlockDefaultState } from '@dopt/javascript-common';

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
   * begun. A noop if the {@link Block} isn't active.
   *
   * @modifies
   *
   * Sets {@link Block.started} to true
   * Sets {@link Block.active} to true
   */
  start: () => void;
  /**
   * Signals that the experience this {@link Block} powers has
   * finished. A noop if the {@link Block} isn't active. Results
   * in a flow transition.
   *
   * @modifies
   *
   * Sets {@link Block.completed} to true
   * Sets {@link Block.active} to false
   */
  complete: () => void;
  /**
   * Signals that the experience this {@link Block} powers
   * has been ended prematurely and/or not finished. Ends
   * progress for this branch in the flow.
   *
   * @modifies
   *
   * Sets {@link Block.stopped} to true
   * Sets {@link Block.active} to false
   */
  stop: () => void;
  /**
   * Signals an end of the entire flow.
   * @modifies
   *
   * Sets {@link Block.exited} to true
   * Sets {@link Block.active} to false
   */
  exit: () => void;
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
 *   const [
 *     { active, completed, started, stopped, exited },
 *     { start, complete, stop, exit },
 *   ] = useBlock("HNWvcT78tyTwygnbzU6SW");
 *   return (
 *     <main>
 *       <Modal isOpen={active}>
 *         <h1>👏 Welcome to our app!</h1>
 *         <p>This is your onboarding experience!</p>
 *         <button onClick={complete}>Close me</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param identifier - the reference ID for some step block
 * @returns [{@link Block}, {@link BlockIntentions}] the state of the block and methods to manipulate said state
 *
 * @alpha
 */
const useBlock = (
  identifier: string
): [block: Block, intent: BlockIntentions] => {
  const { loading, blocks, blockIntentions } = useContext(DoptContext);
  const start = useCallback(
    () => !loading && blockIntentions.start(identifier),
    [loading, blockIntentions]
  );
  const complete = useCallback(
    () => !loading && blockIntentions.complete(identifier),
    [loading, blockIntentions]
  );
  const stop = useCallback(
    () => !loading && blockIntentions.stop(identifier),
    [loading, blockIntentions]
  );
  const exit = useCallback(
    () => !loading && blockIntentions.exit(identifier),
    [loading, blockIntentions]
  );

  return [
    blocks[identifier] || getBlockDefaultState(identifier),
    { start, complete, stop, exit },
  ];
};

export { useBlock };
