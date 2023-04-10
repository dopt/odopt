import { Block, Flow } from '@dopt/block-api-types';

export function getDefaultBlockState(
  uid: string,
  sid: string,
  version: number
): Block {
  return {
    kind: 'block',
    type: 'model',
    uid,
    sid,
    version,
    state: {
      active: false,
      entered: false,
      exited: false,
    },
    transitioned: {},
    fields: [],
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
      stopped: false,
      finished: false,
    },
    blocks: [],
  };
}
