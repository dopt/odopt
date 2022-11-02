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
export interface Intentions {
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
 * @returns [{@link Block}, {@link Intentions}] the state of the block and methods to manipulate said state
 *
 * @alpha
 */
const useBlock = (identifier: string): [block: Block, intent: Intentions] => {
  const { loading, blocks, intentions } = useContext(DoptContext);
  const start = useCallback(
    () => !loading && intentions.start(identifier),
    [loading, intentions]
  );
  const complete = useCallback(
    () => !loading && intentions.complete(identifier),
    [loading, intentions]
  );
  const stop = useCallback(
    () => !loading && intentions.stop(identifier),
    [loading, intentions]
  );
  const exit = useCallback(
    () => !loading && intentions.exit(identifier),
    [loading, intentions]
  );

  return [
    blocks[identifier] || getBlockDefaultState(identifier),
    { start, complete, stop, exit },
  ];
};

/**
 * A React hook for accessing a flow's block state and
 * methods corresponding to an intent-based API for manipulating
 * said state.
 *
 * @param identifier - the reference ID for some step block
 * @returns [{@link Block}, {@link Intentions}] the state of the block and methods to manipulate said state
 *
 * @deprecated
 */
const useDopt = useBlock;

export { useBlock, useDopt };
