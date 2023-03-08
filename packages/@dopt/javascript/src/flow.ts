import { blocksApi } from '@dopt/javascript-common';

import { flowStore, blockStore } from './store';

import type {
  Flow as FlowType,
  Block as BlockType,
  FlowIntent,
} from '@dopt/block-types';

/**
 * @internal
 */
export interface FlowProps {
  intent: ReturnType<typeof blocksApi>['flowIntent'];
  flow: FlowType;
  flowBlocks: Map<FlowType['uid'], BlockType['uid'][]>;
  flowPromise: Promise<boolean>;
}

export class Flow {
  private intent: FlowProps['intent'];
  private flow: FlowProps['flow'];
  private flowBlocks: FlowProps['flowBlocks'];
  private flowPromise: FlowProps['flowPromise'];

  /**
   * @internal
   */
  constructor({ intent, flow, flowBlocks, flowPromise }: FlowProps) {
    this.intent = intent;
    this.flow = flow;
    this.flowBlocks = flowBlocks;
    this.flowPromise = flowPromise;
  }

  /**
   * Returns the up-to-date state of this {@link Flow} instance.
   *
   * @returns The state of this instance.
   */
  state(): FlowType['state'] {
    return flowStore.getState()[this.flow.uid]?.state || this.flow.state;
  }

  /**
   * Returns a promise that resolves when this flow has been initialized
   * (or if it fails to initialize).
   *
   * Initialization is defined as:
   * - the flow has been fetched
   * - Dopt's socket connection is ready
   * - the flow has been started, if necessary
   *
   * @remarks
   * When initialization succeeds, this will return true.
   * If any parts of initialization fail, this will return false.
   * Likewise, if this flow doesn't match any flows passed in the {@link DoptConfig},
   * this will return false.
   *
   * @example
   * ```js
   * const flow = dopt.flow('onboarding-flow');
   * flow.initialized().then(() => {
   *   // Safely access the first block in this flow
   *   const block = dopt.block("HNWvcT78tyTwygnbzU6SW");
   * });
   * ```
   *
   * @returns A Promise.
   * Once this flow's initialization is complete,
   * the promise resolves to `true` if successful, `false` otherwise.
   */
  initialized(): Promise<boolean> {
    return this.flowPromise;
  }

  /**
   * Returns all the block children of this {@link Flow}.
   *
   * @remarks
   * Blocks returned by this method have type {@link BlockType}.
   * They are raw data representations. To generate {@link Block}, use `dopt.block` ({@link Dopt.block}).
   *
   * @example
   * ```js
   * const data = flow.blocks();
   *
   * // can access state properties safely
   * const states = data.map(({ state }) => state);
   *
   * // for all other methods, use a Block class
   * const blocks = data.map(({ uid }) => dopt.block(uid));
   * ```
   *
   * @returns An array of {@link FlowType['blocks']} which are contained within this flow.
   */
  blocks(): FlowType['blocks'] {
    const uids = this.flowBlocks.get(this.flow.uid) || [];
    const blocks = blockStore.getState();
    return uids?.map((uid) => blocks[uid]) || [];
  }

  private _intent(intent: FlowIntent) {
    const { uid, version } = this.flow;
    this.intent({ uid, version, intent });
  }

  /**
   * Start this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  start() {
    this._intent('start');
  }

  /**
   * Complete this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  complete() {
    this._intent('complete');
  }

  /**
   * Exit this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  exit() {
    this._intent('exit');
  }

  /**
   * Reset this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  reset() {
    this._intent('reset');
  }

  /**
   * Subscribe to changes on this flow.
   *
   * @example
   * ```js
   * const flow = dopt.flow("welcome-to-dopt");
   * const unsubscribe = flow.subscribe(async flowData => {
   *  // access .state instead of .state()
   *  // since flowData is an object of `FlowType`
   *  if (flowData.state.completed) {
   *     await showModal("Yay, you've completed your first tour!");
   *     unsubscribe();
   *  }
   * });
   * ```
   *
   * @param listener
   * The listener function is called with a {@link FlowType} object.
   * You can use `dopt.flow()` to access a {@link Flow} instance instead.
   *
   * @returns A function which can be called to unsubscribe the listener.
   */
  subscribe(listener: (flow: FlowType) => void) {
    const { uid } = this.flow;
    return flowStore.subscribe((state) => {
      return state[uid];
    }, listener);
  }
}
