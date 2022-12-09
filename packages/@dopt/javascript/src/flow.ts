import { blocksApi } from '@dopt/javascript-common';

import { blockStore } from './store';

import { Mercator } from '@dopt/mercator';

import type {
  Flow as FlowType,
  Block as BlockType,
  FlowIntent,
} from '@dopt/block-types';

import { flowStore } from './store';

interface Props {
  intent: ReturnType<typeof blocksApi>['flowIntent'];
  flow: FlowType;
  flowBlocks: Mercator<
    [FlowType['sid'], FlowType['version']],
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
    return this.flow.state;
  }

  blocks(): FlowType['blocks'] {
    const uids = this.flowBlocks.get([this.flow.uid, this.flow.version]) || [];
    const blocks = blockStore.getState();
    return uids?.map((uid) => blocks[uid]) || [];
  }

  private _intent(intent: FlowIntent) {
    const { uid, version } = this.flow;
    return this.intent({ uid, version, intent });
  }

  start() {
    return this._intent('start');
  }

  complete() {
    return this._intent('complete');
  }

  exit() {
    return this._intent('exit');
  }

  reset() {
    return this._intent('reset');
  }

  subscribe(listener: (flow: FlowType) => void) {
    const { uid, version } = this.flow;
    flowStore.subscribe((flows) => {
      const f = flows.get([uid, version]);
      if (!f) {
        throw new Error(
          `Unable to subscribe to Flow<{uid:${uid},version:${version}}>`
        );
      }
      return f;
    }, listener);
  }
}

export { Flow };
