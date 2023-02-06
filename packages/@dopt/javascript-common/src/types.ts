import { Mercator } from '@dopt/mercator';
import type { Block, Flow, BlockIntent, FlowIntent } from '@dopt/block-types';

export type Blocks = Record<Block['uid'], Block>;

export type BlockIntention = Record<
  BlockIntent,
  (uid: Block['uid'], goToUid?: Block['uid']) => Promise<void>
>;

export type Flows = Mercator<[Flow['sid'], Flow['version']], Flow>;

export type FlowIntention = Record<
  FlowIntent,
  (uid: Flow['uid'], version: Flow['version']) => Promise<void>
>;

export type FlowStateKey = string & { __opaque__: 'FlowStateKey' };

export function generateFlowStateKey(
  uid: Flow['uid'],
  version: Flow['version']
): FlowStateKey {
  return JSON.stringify([uid, version]) as FlowStateKey;
}

export type FlowStates = Record<FlowStateKey, Flow>;
