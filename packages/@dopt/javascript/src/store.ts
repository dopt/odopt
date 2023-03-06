import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Flow, Block } from '@dopt/block-types';

export type Blocks = Record<Block['uid'], Block>;
export type FlowStateKey = string & { __opaque__: 'FlowStateKey' };

export function generateFlowStateKey(
  uid: Flow['uid'],
  version: Flow['version']
): FlowStateKey {
  return JSON.stringify([uid, version]) as FlowStateKey;
}

export type FlowStates = Record<FlowStateKey, Flow>;

export const blockStore = create(subscribeWithSelector<Blocks>(() => ({})));
export const flowStore = create(subscribeWithSelector<FlowStates>(() => ({})));
