export type BlockTable =
  | 'FinishBlock'
  | 'EntryBlock'
  | 'ModelBlock'
  | 'SetBlock';

export type BlockType = 'Entry' | 'Model' | 'Finish' | 'Set' | 'Element';

export const DEFAULT_BLOCK_NAMES: Record<BlockTable, string> = {
  EntryBlock: 'Start',
  ModelBlock: 'Step',
  FinishBlock: 'Finish',
  SetBlock: 'Group',
};

export const DEFAULT_BLOCK_DESC: Record<BlockTable, string> = {
  EntryBlock: 'How users enter into the flow',
  ModelBlock: 'Define state for an experience',
  FinishBlock: 'Define when the flow is finished',
  SetBlock: 'Groups steps together',
};
