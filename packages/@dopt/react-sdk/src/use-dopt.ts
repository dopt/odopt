import { useContext, useCallback, useEffect } from 'react';
import { DoptContext } from './context';

import { Block } from './types';
import { getBlockDefaultState } from './utils';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a block. These methods
 * have side effects i.e. journey transitions are a function
 * of block transitions, expressed through the following
 * pseudo code:
 *
 * ```ts
 * journey.transition(blockState, intent)
 * ```
 *
 */
export interface Methods {
  /**
   * Signals that the experience this {@link Block} powers has
   * begun.  A noop if the {@link Block} isn't active.
   *
   * @modifies
   *
   * Sets {@link Block.started} to true
   * Sets {@link Block.active} to true
   */
  start: () => void;
  /**
   * Signals that the experience this {@link Block} powers has
   * finished.  A noop if the {@link Block} isn't active. Results
   * in a journey transition.
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
   * progress for this branch in the jouurney.
   *
   * @modifies
   *
   * Sets {@link Block.stopped} to true
   * Sets {@link Block.active} to false
   */
  stop: () => void;
  /**
   * Signals an end of the entire journey.
   * @modifies
   *
   * Sets {@link Block.exited} to true
   * Sets {@link Block.active} to false
   */
  exit: () => void;
}

/**
 * A React Hook for accessing a Journey's Model Block State and
 * methods corresponding to an intent-based API for maniuplating
 * said state.
 *
 * @example
 * ```ts
 *  import { useDopt } from '@dopt/react';
 *  import { Modal } from '@your-company/modal';
 *
 *  export function Application() {
 *    const [{ active }, { complete }] = useDopt('HNWvcT78tyTwygnbzU6SW');
 *    return (
 *      <main>
 *        <Modal
 *          isOpen={active}
 *          title="👏 Welcome to your first journey!"
 *          footerItems={{
 *            primaryActions: [{ label: 'Got it', onClick: complete }],
 *          }}
 *        >
 *          <Text>
 *            This is your onboarding experience!
 *          </Text>
 *        </Modal>
 *      </main>
 *    );
 *  }
 * ```
 *
 * @param identifier - the "Reference Id" for some Journey Model Block
 * @returns [{@link Block}, {@link Methods}] - The state of the Block for
 *
 * @alpha
 */
const useDopt = (identifier: string): [Block, Methods] => {
  const { blocks, methods } = useContext(DoptContext);
  useEffect(() => {
    if (!(identifier in blocks)) {
      methods.get(identifier);
    }
  }, [identifier]);
  const start = useCallback(() => methods.start(identifier), []);
  const complete = useCallback(() => methods.complete(identifier), []);
  const stop = useCallback(() => methods.stop(identifier), []);
  const exit = useCallback(() => methods.exit(identifier), []);

  return [
    blocks[identifier] || getBlockDefaultState(identifier),
    { start, complete, stop, exit },
  ];
};

export { useDopt };
