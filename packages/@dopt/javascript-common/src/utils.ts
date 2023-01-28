import { Block, BlockTypes, BLOCK_TYPES, Flow, Set } from '@dopt/block-types';

export function getDefaultBlockState(
  uid: string,
  version?: number,
  type: BlockTypes = BLOCK_TYPES.model
): Block {
  return {
    kind: 'block',
    type,
    uid,
    sid: uid,
    version: version != null ? version : -1,
    state: {
      active: false,
      completed: false,
    },
    blocks: [],
    size: 0,
    properties: [],
  };
}

export function getDefaultSetState(uid: string, version?: number): Set {
  return getDefaultBlockState(uid, version, BLOCK_TYPES.set) as Set;
}

export function getDefaultFlowState(sid: string, version: number): Flow {
  return {
    kind: 'flow',
    type: 'flow',
    uid: sid,
    sid,
    version,
    state: {
      started: false,
      exited: false,
      completed: false,
    },
  };
}

export const INTENT_POST_OPTIONS = {
  method: 'POST',
  body: '{}',
  headers: {
    'Content-Type': 'application/json',
  },
};
