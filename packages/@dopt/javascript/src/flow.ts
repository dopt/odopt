import { blocksApi, generateFlowStateKey } from '@dopt/javascript-common';

import { flowStore, blockStore } from './store';

import { Mercator } from '@dopt/mercator';

import type {
  Flow as FlowType,
  Block as BlockType,
  FlowIntent,
} from '@dopt/block-types';

interface Props {
  intent: ReturnType<typeof blocksApi>['flowIntent'];
  flow: FlowType;
  flowBlocks: Mercator<
    [FlowType['uid'], FlowType['version']],
    BlockType['uid'][]
  >;
}

class Flow {
  private intent: Props['intent'];
  private flow: Props['flow'];
  private flowBlocks: Props['flowBlocks'];

  constructor({ intent, flow, flowBlocks }: Props) {
    this.intent = intent;
    this.flow = flow;
    this.flowBlocks = flowBlocks;
  }

  state(): FlowType['state'] {
    const { uid, version } = this.flow;
    const key = generateFlowStateKey(uid, version);
    return flowStore.getState()[key]?.state || this.flow.state;
  }

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

  async start() {
    return this._intent('start');
  }

  async complete() {
    return this._intent('complete');
  }

  async exit() {
    return this._intent('exit');
  }

  async reset() {
    return this._intent('reset');
  }

  subscribe(listener: (flow: FlowType) => void) {
    const { uid, version } = this.flow;
    flowStore.subscribe((state) => {
      const key = generateFlowStateKey(uid, version);
      return state[key];
    }, listener);
  }
}

export { Flow };
