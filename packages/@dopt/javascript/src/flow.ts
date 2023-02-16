import { blocksApi, generateFlowStateKey } from '@dopt/javascript-common';

import { flowStore, blockStore } from './store';

import { Mercator } from '@dopt/mercator';

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
  flowBlocks: Mercator<
    [FlowType['uid'], FlowType['version']],
    BlockType['uid'][]
  >;
}

export class Flow {
  private intent: FlowProps['intent'];
  private flow: FlowProps['flow'];
  private flowBlocks: FlowProps['flowBlocks'];

  /**
   * @internal
   */
  constructor({ intent, flow, flowBlocks }: FlowProps) {
    this.intent = intent;
    this.flow = flow;
    this.flowBlocks = flowBlocks;
  }

  /**
   * Returns the up-to-date state of this {@link Flow} instance.
   *
   * @returns The state of this instance.
   */
  state(): FlowType['state'] {
    const { uid, version } = this.flow;
    const key = generateFlowStateKey(uid, version);
    return flowStore.getState()[key]?.state || this.flow.state;
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
    const { uid, version } = this.flow;
    const uids = this.flowBlocks.get([uid, version]) || [];
    const blocks = blockStore.getState();
    return uids?.map((uid) => blocks[uid]) || [];
  }

  private async _intent(intent: FlowIntent) {
    const { uid, version } = this.flow;
    return this.intent({ uid, version, intent });
  }

  /**
   * Start this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this flow has been started successfully and rejects otherwise.
   */
  async start() {
    return this._intent('start');
  }

  /**
   * Complete this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this flow has been completed successfully and rejects otherwise.
   */
  async complete() {
    return this._intent('complete');
  }

  /**
   * Exit this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this flow has been exited successfully and rejects otherwise.
   */
  async exit() {
    return this._intent('exit');
  }

  /**
   * Reset this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * It is often unnecessary to wait for this function to resolve / reject.
   *
   * @returns A promise which resolves when this flow has been reset successfully and rejects otherwise.
   */
  async reset() {
    return this._intent('reset');
  }

  /**
   * Subscribe to changes on this flow.
   *
   * @example
   * ```js
   * const flow = dopt.flow("welcome-to-dopt", 3);
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
    const { uid, version } = this.flow;
    return flowStore.subscribe((state) => {
      const key = generateFlowStateKey(uid, version);
      return state[key];
    }, listener);
  }
}
