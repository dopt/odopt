import type { Block, Flow } from '@dopt/block-types';

export function getDefaultBlockState(uid: string): Block {
  return {
    kind: 'block',
    type: 'model',
    uid,
    sid: uid,
    version: -1,
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
