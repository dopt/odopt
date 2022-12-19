export type BlockTable = 'finish' | 'entry' | 'model' | 'set';

export type BlockType = 'entry' | 'model' | 'finish' | 'set';

export const DEFAULT_BLOCK_NAMES: Record<BlockType, string> = {
  entry: 'Start',
  model: 'Step',
  finish: 'Finish',
  set: 'Group',
};

export const DEFAULT_BLOCK_DESC: Record<BlockType, string> = {
  entry: 'How users enter into the flow',
  model: 'Define state for an experience',
  finish: 'Define when the flow is finished',
  set: 'Groups steps together',
};

// Not very useful right now but in the future this mapping is needed
// and its scary to just assume that types and tables are 1:1 in code
export function convertTypeToTable(type: BlockType): BlockTable {
  switch (type) {
    case 'entry':
      return 'entry';
    case 'finish':
      return 'finish';
    case 'model':
      return 'model';
    case 'set':
      return 'set';
  }
}
