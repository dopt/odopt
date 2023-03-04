import { useContext, useCallback, useMemo } from 'react';
import { DoptContext } from './context';

import type { Flow } from '@dopt/block-types';
import { getDefaultFlowState } from '@dopt/javascript-common';

/**
 * Methods corresponding to an intent-based API for
 * signaling state transitions of a flow. These methods
 * have side effects on {@link Block['state']} contained
 * within the flow.
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
  reset: () => void | undefined;
  /**
   * Exits the flow.
   *
   * @modifies
   * Sets {@link Flow['state']['exited']} to true
   * Sets all {@link Block['state']['active']} to false
   */
  exit: () => void | undefined;
  /**
   * Completes the flow, independent of a
   * completed state that might be derived from
   * its {@link Block[]}.
   *
   * @modifies
   * Sets {@link Flow['state']['completed']} to true
   * Sets all {@link Block['state']['active']} to false
   */
  complete: () => void | undefined;
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
 *   const [flow, intent] = useFlow("new-user-onboarding");
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
 * @returns [{@link Flow}, {@link FlowIntentions}] the state of the flow and methods to manipulate said state
 *
 */
const useFlow = (
  sid: Flow['sid']
): [flow: Partial<Flow>, intent: FlowIntentions] => {
  const { fetching, flows, flowBlocks, blocks, flowIntention, log } =
    useContext(DoptContext);

  const version = useMemo(() => {
    if (fetching) {
      return -1;
    }
    const key = Array.from(flows.keys()).find(([name]) => name === sid);
    if (key == undefined) {
      throw new Error(`
        Error using \`useFlow(${sid})\` - check your \`flowVersions\`
        props to ensure \`${sid}\` and its version is specified there`);
    }
    return key[1];
  }, [fetching, flows, sid]);

  const reset = useCallback(() => {
    if (!fetching) {
      flowIntention.reset(sid, version);
    }
  }, [fetching, flowIntention, sid, version]);

  const exit = useCallback(() => {
    if (!fetching) {
      flowIntention.exit(sid, version);
    }
  }, [fetching, flowIntention, sid, version]);

  const complete = useCallback(() => {
    if (!fetching) {
      flowIntention.complete(sid, version);
    }
  }, [fetching, flowIntention, sid, version]);
  if (fetching) {
    log.info(
      'Accessing flow prior to initialization will return default block states.'
    );
  }
  if (fetching || !flows.get([sid, version])) {
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
