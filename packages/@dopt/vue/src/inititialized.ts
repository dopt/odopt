import { Ref, inject, ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';
import { Flow } from '@dopt/javascript';

/**
 * A Vue composable for accessing whether the Dopt Plugin has been initialized.
 *
 * Dopt-level initialization is defined as:
 * - all flows have been fetched
 * - Dopt's socket connection is ready
 * - all flows which need to be started have been started
 *
 * @remarks
 * Note, this composable does not check whether any initialization steps had errors.
 * Use {@link useFlowStatus} to check flow status, including failures,
 * at a more granular level.
 *
 * @returns A `Ref<boolean>`, `true` when Dopt is initialized, `false` otherwise.
 */
export function useDoptInitialized(): Ref<boolean> {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error(
      'Cannot call `useDoptInitialized` without using DoptPlugin'
    );
  }

  const done = ref(false);

  dopt.initialized().then(() => (done.value = true));

  return done;
}

/**
 * A Vue composable for accessing a Flow's initialization status.
 *
 * Initialization is defined as:
 * - the flow has been fetched
 * - Dopt's socket connection is ready
 * - the flow has been started, if necessary
 *
 * @remarks Once initialized, the status will be updated to `pending: false`.
 * If any parts of initialization fail, the status will additionally
 * have `failed: true`. If the `sid` doesn't match any flows, the function
 * will always return `pending: true, failed: false`.
 *
 * @param sid - {@link Flow['sid']}
 *
 * @returns `{ pending: Ref<boolean>, failed: Ref<boolean> }`
 */
export function useFlowStatus(sid: Flow['sid']): {
  pending: Ref<boolean>;
  failed: Ref<boolean>;
} {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error(
      'Cannot call `useFlowInitialized` without using DoptPlugin'
    );
  }

  const pending = ref(true);
  const failed = ref(false);

  const flow = dopt.flow(sid);
  flow.initialized().then((success) => {
    pending.value = false;

    if (!success) {
      failed.value = true;
    }
  });

  return { pending, failed };
}
