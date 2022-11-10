export type BlockType = 'FinishBlock' | 'EntryBlock' | 'ModelBlock';

export const DEFAULT_BLOCK_NAMES: Record<BlockType, string> = {
  EntryBlock: 'Start',
  ModelBlock: 'Step',
  FinishBlock: 'Finish',
};

export const DEFAULT_BLOCK_DESC: Record<BlockType, string> = {
  EntryBlock: 'How users enter into the flow',
  ModelBlock: 'Define state for an experience',
  FinishBlock: 'Define when the flow is finished',
};
