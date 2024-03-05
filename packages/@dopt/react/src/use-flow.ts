import { useContext, useCallback, useMemo } from 'react';
import { DoptContext } from './context';
import { Flow, FlowIntent } from './types';

import { getDefaultFlowState } from '@dopt/javascript-common';
import { createBlock } from './create-sdk-block';

/**
 * A React hook for accessing a flow's state and
 * methods corresponding to an intent-based API for manipulating
 * flow state.
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
 *       <Modal isOpen={flow.state.finished}>
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
 * @returns [{@link Flow}, {@link FlowIntent}] the state of the flow and methods to manipulate flow state
 *
 */

export function useFlow(sid: Flow['sid']): [flow: Flow, intent: FlowIntent] {
  const {
    fetching,
    flows,
    flowBlocks,
    blocks,
    blockIntention,
    flowIntention,
    log,
    blockFields,
  } = useContext(DoptContext);

  if (fetching) {
    log.current?.info(
      'Accessing flow prior to initialization will return default block states.'
    );
  } else if (flows[sid] == null) {
    log.current?.warn(
      `
      Could not find any flow matching "${sid}" within \`useFlow("${sid}")\`.
      Returning a default flow.
      Check your \`flowVersions\` props to ensure "${sid}" and its version are specified there.
    `.trim()
    );
  }

  const version = useMemo(() => {
    if (fetching) {
      return -1;
    }

    const flow = flows[sid];

    if (flow == null) {
      return -1;
    }

    return flow.version;
  }, [fetching, flows, sid]);

  const start = useCallback(
    (options?: { force?: boolean }) => {
      if (!fetching) {
        flowIntention.start(sid, version, options?.force);
      }
    },
    [fetching, flowIntention, sid, version]
  );

  const reset = useCallback(
    (options?: { force?: boolean }) => {
      if (!fetching) {
        flowIntention.reset(sid, version, options?.force);
      }
    },
    [fetching, flowIntention, sid, version]
  );

  const stop = useCallback(() => {
    if (!fetching) {
      flowIntention.stop(sid, version);
    }
  }, [fetching, flowIntention, sid, version]);

  const finish = useCallback(() => {
    if (!fetching) {
      flowIntention.finish(sid, version);
    }
  }, [fetching, flowIntention, sid, version]);

  const flow = useMemo(() => {
    const updatedFlow =
      fetching || !flows[sid] ? getDefaultFlowState(sid, version) : flows[sid];

    const updatedBlocks = (flowBlocks.get(sid) || []).map((uid) =>
      createBlock({ uid, fetching, blocks, blockFields, blockIntention })
    );

    return { ...updatedFlow, blocks: updatedBlocks };
  }, [
    fetching,
    sid,
    version,
    flows,
    flowBlocks,
    blocks,
    blockFields,
    blockIntention,
  ]);
  flow.version;

  return [flow, { start, reset, stop, finish }];
}
