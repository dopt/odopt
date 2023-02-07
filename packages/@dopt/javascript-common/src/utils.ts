import {
  Block,
  getDefaultBlock,
  BlockTypes,
  BLOCK_TYPES,
  Flow,
  Set,
} from '@dopt/block-types';

export function getDefaultBlockState(
  uid: string,
  version?: number,
  type: BlockTypes = BLOCK_TYPES.model
): Block {
  return getDefaultBlock({ uid, type, version });
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
