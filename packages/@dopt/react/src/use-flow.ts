import { useContext, useCallback } from 'react';
import { DoptContext } from './context';

import { Flow } from '@dopt/javascript-common';

export interface FlowIntentions {
  reset: () => void;
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
 *       <Modal>
 *         <h1>👏 Your onboarding has finished!</h1>
 *         <p>Want to reset? click the button below.</p>
 *         <button onClick={intent.reset}>Reset onboarding</button>
 *       </Modal>
 *     </main>
 *   );
 * }
 * ```
 *
 * @param name - the flow identifier
 * @param version - the flow version
 * @returns [{@link Flow}, {@link FlowIntentions}] the state of the flow and methods to manipulate said state
 *
 * @alpha
 */
const useFlow = (
  name: string,
  version: number
): [flow: Flow, intent: FlowIntentions] => {
  const { loading, flows, flowIntentions } = useContext(DoptContext);

  const reset = useCallback(
    () => !loading && flowIntentions.reset(name, version),
    [loading, flowIntentions, name, version]
  );

  return [flows[name][version], { reset }];
};

export { useFlow };
