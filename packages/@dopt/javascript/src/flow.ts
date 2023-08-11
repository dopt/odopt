import {
  blocksApi,
  Flow as FlowType,
  Block as BlockType,
  FlowIntentParams,
} from '@dopt/javascript-common';

import { flowStore } from './store';

import { Block } from './block';

/**
 * @internal
 */
export interface FlowProps {
  intent: ReturnType<typeof blocksApi>['flowIntent'];
  flow: FlowType;
  flowBlocks: Map<FlowType['sid'], BlockType['uid'][]>;
  flowPromise: Promise<boolean>;
  createBlock: <T>(uid: string) => Block<T>;
}

export class Flow {
  private intent: FlowProps['intent'];
  private flow: FlowProps['flow'];
  private flowBlocks: FlowProps['flowBlocks'];
  private flowPromise: FlowProps['flowPromise'];
  private createBlock: FlowProps['createBlock'];

  /**
   * @internal
   */
  constructor({
    intent,
    flow,
    flowBlocks,
    flowPromise,
    createBlock,
  }: FlowProps) {
    this.intent = intent;
    this.flow = flow;
    this.flowBlocks = flowBlocks;
    this.flowPromise = flowPromise;
    this.createBlock = createBlock;
  }

  get type() {
    return this.flow.type;
  }

  get kind() {
    return this.flow.kind;
  }

  get uid() {
    return this.flow.uid;
  }

  get sid() {
    return this.flow.sid;
  }

  get version() {
    return this.flow.version;
  }

  /**
   * Returns the up-to-date state of this {@link Flow} instance.
   *
   * @returns The state of this instance.
   */
  get state(): FlowType['state'] {
    return flowStore.getState()[this.flow.sid]?.state || this.flow.state;
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
   * Blocks returned by this method have type {@link Block}.
   *
   * @example
   * ```js
   * const blocks = flow.blocks();
   *
   * // can access state properties safely
   * const states = blocks.map((block) => block.state);
   *
   * // to transition these blocks
   * data.map(block => block.transition('default'));
   * ```
   *
   * @returns An array of {@link Block} which are contained within this flow.
   */
  get blocks(): Block[] {
    const uids = this.flowBlocks.get(this.flow.sid) || [];
    return uids?.map((uid) => this.createBlock(uid)) || [];
  }

  private _intent(intent: FlowIntentParams['intent'], force?: boolean) {
    const { sid, version } = this.flow;
    const storedFlow = flowStore.getState()[this.flow.sid];

    if (storedFlow) {
      this.intent({ sid, version, intent, force });
    }
  }

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
  start(options?: { force?: boolean }) {
    this._intent('start', options?.force);
  }

  /**
   * Finish this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  finish(): void {
    this._intent('finish');
  }

  /**
   * Stop this flow. Will also update the state of blocks within this flow, as appropriate.
   *
   * @remarks
   * This function will update state with Dopt and trigger changes. Subscribe to the
   * flows and blocks you care about to react to those changes.
   *
   * @returns void
   */
  stop(): void {
    this._intent('stop');
  }

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
  reset(options?: { force?: boolean }) {
    this._intent('reset', options?.force);
  }

  /**
   * Subscribe to changes on this flow.
   *
   * @example
   * ```js
   * const flow = dopt.flow("welcome-to-dopt");
   * const unsubscribe = flow.subscribe(async (flow: Flow) => {
   *  if (flow.state.completed) {
   *     await showModal("Yay, you've completed your first tour!");
   *     unsubscribe();
   *  }
   * });
   * ```
   *
   * @param listener
   * The listener function is called with this {@link Flow} instance.
   *
   * @returns A function which can be called to unsubscribe the listener.
   */
  subscribe(listener: (flow: Flow) => void) {
    return flowStore.subscribe(
      (flows) => flows[this.flow.sid],
      () => listener(this)
    );
  }
}
