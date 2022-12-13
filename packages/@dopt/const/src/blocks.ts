export type BlockTable =
  | 'FinishBlock'
  | 'EntryBlock'
  | 'ModelBlock'
  | 'SetBlock';

export type BlockType = 'Entry' | 'Model' | 'Finish' | 'Set';

export const DEFAULT_BLOCK_NAMES: Record<BlockType, string> = {
  Entry: 'Start',
  Model: 'Step',
  Finish: 'Finish',
  Set: 'Group',
};

export const DEFAULT_BLOCK_DESC: Record<BlockType, string> = {
  Entry: 'How users enter into the flow',
  Model: 'Define state for an experience',
  Finish: 'Define when the flow is finished',
  Set: 'Groups steps together',
};

export function convertTypeToTable(type: BlockType): BlockTable {
  switch (type) {
    case 'Entry':
      return 'EntryBlock';
    case 'Finish':
      return 'FinishBlock';
    case 'Model':
      return 'ModelBlock';
    case 'Set':
      return 'SetBlock';
  }
}
