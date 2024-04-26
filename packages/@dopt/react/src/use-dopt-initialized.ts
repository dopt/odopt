import { useContext, useMemo } from 'react';
import { FlowContext } from './flow-provider';

/**
 * A React hook for accessing whether Dopt has been initialized.
 *
 * Dopt-level initialization is defined as:
 * - all flows have been fetched
 * - Dopt's socket connection is ready
 * - all flows which need to be started have been started
 *
 * @remarks
 * Note, this hook does not check whether any initialization steps had errors.
 * Use {@link useFlowStatus} to check flow status, including failures,
 * at a more granular level.
 *
 * @returns A boolean, `true` if Dopt is initialized, `false` otherwise.
 */
export function useDoptInitialized(): boolean {
  const { flowStatuses } = useContext(FlowContext);
  const initialized = useMemo(() => {
    const statuses = Object.values(flowStatuses);
    return statuses.length > 0 && statuses.every((status) => !status.pending);
  }, [flowStatuses]);

  return initialized;
}
