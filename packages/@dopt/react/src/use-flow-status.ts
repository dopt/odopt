import { FlowStatus } from './types';
import type { Flow } from '@dopt/javascript-common';
import { useContext, useMemo } from 'react';
import { FlowContext } from './flow-provider';

/**
 * A React hook for accessing a Flow's initialization status.
 *
 * Initialization is defined as:
 * - the flow has been fetched
 * - Dopt's socket connection is ready
 * - the flow has been started, if necessary
 *
 * @remarks Once initialized, the status will be marked `pending: false`.
 * If any parts of initialization fail, the status will additionally
 * have `failed: true`. If the `sid` doesn't match any flows, the function
 * will return `pending: true, failed: false`.
 *
 * @param sid - {@link Flow['sid']}
 *
 * @returns A flow's {@link FlowStatus}.
 */
export function useFlowStatus(sid: Flow['sid']): FlowStatus {
  const { flowStatuses } = useContext(FlowContext);
  const flowStatus = useMemo(
    () => flowStatuses[sid] || { pending: true, failed: false },
    [sid, flowStatuses]
  );
  return flowStatus;
}
