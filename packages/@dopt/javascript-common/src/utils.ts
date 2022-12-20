import { Block, BLOCK_TYPES, Flow } from '@dopt/block-types';

export function getDefaultBlockState(uid: string, version?: number): Block {
  return {
    kind: 'block',
    type: BLOCK_TYPES.model,
    uid,
    sid: uid,
    version: version != null ? version : -1,
    state: {
      active: false,
      completed: false,
    },
  };
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
