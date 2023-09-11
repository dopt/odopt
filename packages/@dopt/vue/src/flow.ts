import { Flow as FlowClass } from '@dopt/javascript';
import { Ref, inject, onBeforeUnmount, ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';

export interface Flow {
  type: Ref<FlowClass['type']>;
  kind: Ref<FlowClass['kind']>;
  uid: Ref<FlowClass['uid']>;
  sid: Ref<FlowClass['sid']>;
  version: Ref<FlowClass['version']>;
  /**
   * The up-to-date state of this {@link Flow}.
   */
  state: Ref<FlowClass['state']>;
  /**
   * Start this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @param force
   * If `options?.force` is passed in as `true`, this flow will be started
   * despite any targeting or entry conditions. Otherwise,
   * this flow will only be started if those conditions are met.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  start(options?: { force?: boolean }): void;
  start(): void;

  /**
   * Finish this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  finish(): void;

  /**
   * Stop this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  stop(): void;

  /**
   * Reset this flow. Will also update the state of blocks within this flow, as appropriate.
   * Under the hood, this method sets flows and blocks to their original/default states
   * and subsequently calls {@link Flow.start}.
   *
   * @param force
   * If `options?.force` is passed in as `true`, this flow will be started
   * despite any targeting or entry conditions. Otherwise,
   * this flow will only be started if those conditions are met.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  reset(options?: { force?: boolean }): void;
  reset(): void;
}

/**
 * A Vue composable for accessing a flow's state and
 * methods corresponding to an intent-based API for manipulating
 * flow state.
 *
 * @param sid - {@link Flow['sid']}
 *
 * @returns a {@link Flow} the state of the flow and methods to manipulate flow state
 *
 */
export function useFlow(sid: FlowClass['sid']): Flow {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useFlow` without using DoptPlugin');
  }

  const _flow = dopt.flow(sid);

  const flow = {
    type: ref(_flow.type),
    kind: ref(_flow.kind),
    uid: ref(_flow.uid),
    sid: ref(_flow.sid),
    version: ref(_flow.version),
    state: ref(_flow.state),
    start: (options?: { force?: boolean }) => _flow.start(options),
    finish: () => _flow.finish(),
    stop: () => _flow.stop(),
    reset: (options?: { force?: boolean }) => _flow.reset(options),
  };

  const unsubscribeFlow = _flow.subscribe(() => {
    flow.type.value = _flow.type;
    flow.kind.value = _flow.kind;
    flow.uid.value = _flow.uid;
    flow.sid.value = _flow.sid;
    flow.version.value = _flow.version;
    flow.state.value = _flow.state;
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeFlow();
  });

  return flow;
}
