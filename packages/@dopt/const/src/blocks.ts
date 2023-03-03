import { BlockTypes, BLOCK_TYPES } from '@dopt/block-types';
export type BlockTable =
  | 'finish'
  | 'entry'
  | 'model'
  | 'set'
  | 'webhook'
  | 'logic';

export const DEFAULT_BLOCK_NAMES: Record<BlockTypes, string> = {
  entry: 'Start',
  model: 'Step',
  finish: 'Finish',
  set: 'Group',
  webhook: 'Webhook',
  logic: 'Logic',
};

export const DEFAULT_BLOCK_DESC: Record<BlockTypes, string> = {
  entry: 'How users enter into the flow',
  model: 'Define state for an experience',
  finish: 'Define when the flow is finished',
  set: 'Groups steps together',
  webhook: 'Send data to an external API',
  logic: 'Define a logical expression to progress a branch',
};

// Not very useful right now but in the future this mapping is needed
// and its scary to just assume that types and tables are 1:1 in code

export function convertTypeToTable(type: BlockTypes): BlockTable {
  switch (type) {
    case BLOCK_TYPES.entry:
      return 'entry';
    case BLOCK_TYPES.finish:
      return 'finish';
    case BLOCK_TYPES.model:
      return 'model';
    case BLOCK_TYPES.set:
      return 'set';
    case BLOCK_TYPES.webhook:
      return 'webhook';
    case BLOCK_TYPES.logic:
      return 'logic';
  }
}
