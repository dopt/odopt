import { useContext, useCallback } from 'react';
import { DoptContext } from './context';

import type { Flow } from '@dopt/block-types';
import { getDefaultFlowState } from '@dopt/javascript-common';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a flow. These methods
 * have side effects on {@link Block['state']}
 *
 */
export interface FlowIntentions {
  /**
   * Resets the flow's state and all of its
   * associated blocks and their state to the
   * original/default state.
   *
   * @modifies
   *
   * Sets {@link Flow['state']['exited']} to false
   * Sets {@link Flow['state']['completed']} to false
   * Sets {@link Flow['state']['started']} to false
   * Sets all {@link Block['state']['active']} to false
   * Sets all {@link Block['state']['completed']} to false
   */
  reset: () => void;
  /**
   * Exits the flow.
   *
   * @modifies
   * Sets {@link Flow['state']['exited']} to true
   * Sets all {@link Block['state']['active']} to false
   */
  exit: () => void;
  /**
   * Completes the flow, independent of a
   * completed state that might be derived from
   * its {@link Block[]}.
   *
   * @modifies
   * Sets {@link Flow['state']['completed']} to true
   * Sets all {@link Block['state']['active']} to false
   */
  complete: () => void;
}

/**
 * A React hook for accessing a flow's state and
 * methods corresponding to an intent-based API for manipulating
 * said state.
 *
 * @example
 * ```tsx
 * import { useFlow } from "@dopt/react";
 * import { Modal } from "@your-company/modal";
 *
 * export function Application() {
 *   const [flow, intent] = useFlow("new-user-onboarding", 1);
 *   return (
 *     <main>
 *       <Modal isOpen={flow.state.completed}>
 *         <h1>👏 Your onboarding has finished!</h1>
 *         <p>Want to reset? click the button below.</p>
 *         <button onClick={intent.reset}>Reset onboarding</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param sid - {@link Flow['sid']}
 * @param version - {@link Flow['version']}
 * @returns [{@link Flow}, {@link FlowIntentions}] the state of the flow and methods to manipulate said state
 *
 */
const useFlow = (
  sid: Flow['sid'],
  version: Flow['version']
): [flow: Partial<Flow>, intent: FlowIntentions] => {
  const { loading, flows, flowBlocks, blocks, flowIntention } =
    useContext(DoptContext);

  const reset = useCallback(
    () => !loading && flowIntention.reset(sid, version),
    [loading, flowIntention, sid, version]
  );

  const exit = useCallback(
    () => !loading && flowIntention.exit(sid, version),
    [loading, flowIntention, sid, version]
  );

  const complete = useCallback(
    () => !loading && flowIntention.complete(sid, version),
    [loading, flowIntention, sid, version]
  );

  if (loading || !flows.get([sid, version])) {
    return [getDefaultFlowState(sid, version), { reset, exit, complete }];
  }

  const flow = flows.get([sid, version]);
  const updated =
    (flowBlocks.get([sid, version]) || []).map((uid) => blocks[uid]) || [];

  return [
    {
      ...flow,
      blocks: updated,
    },
    { reset, exit, complete },
  ];
};

export { useFlow };
