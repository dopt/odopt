import { useContext, useMemo } from 'react';
import { DoptContext } from './context';

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
 * Use {@link useFlowInitialized} to check flow status, including failures,
 * at a more granular level.
 *
 * @returns A boolean.
 */
const useDoptInitialized = (): boolean => {
  const { flowStatuses } = useContext(DoptContext);
  const initialized = useMemo(() => {
    const statuses = Object.values(flowStatuses);
    return statuses.length > 0 && statuses.every((status) => !status.pending);
  }, [flowStatuses]);

  return initialized;
};

export { useDoptInitialized };
