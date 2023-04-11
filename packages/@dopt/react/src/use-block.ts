import { useContext, useCallback, useMemo } from 'react';
import { DoptContext } from './context';

import { Block, BlockTransition, BlockTransitionInputs } from './types';
import { createBlock } from './create-sdk-block';

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
 *   const [block, transition] = useBlock("HNWvcT78tyTwygnbzU6SW");
 *   const onClick = useCallback(() => {
 *     transition('default');
 *   }, [transition]);
 *   return (
 *     <main>
 *       <Modal isOpen={block.state.active}>
 *         <h1>👏 Welcome to our app!</h1>
 *         <p>This is your onboarding experience!</p>
 *         <button onClick={onClick}>Close me</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param id - one of {@link Block['sid']} | {@link Block['uid']}
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns [{@link Block}, {@link BlockTransition}] the state of the block and methods to manipulate said state
 *
 */
export function useBlock<T>(
  id: string
): [block: Block<T>, transition: BlockTransition<T>] {
  const { fetching, blocks, blockIntention, log, blockFields, blockUidBySid } =
    useContext(DoptContext);

  if (fetching) {
    log.info(
      'Accessing block prior to initialization will return default block states.'
    );
  }

  const uid = blockUidBySid.get(id) || id;

  const transition = useCallback(
    (...inputs: BlockTransitionInputs) => {
      if (!fetching) {
        blockIntention(uid, inputs);
      }
    },
    [fetching, blockIntention]
  );

  const block = useMemo(
    () => createBlock<T>({ uid, fetching, blocks, blockFields }),
    [uid, fetching, blocks, blockFields]
  );

  return [block, transition];
}
