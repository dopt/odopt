export type BlockType =
  | 'FinishBlock'
  | 'EntryBlock'
  | 'ModelBlock'
  | 'SetBlock';

export const DEFAULT_BLOCK_NAMES: Record<BlockType, string> = {
  EntryBlock: 'Start',
  ModelBlock: 'Step',
  FinishBlock: 'Finish',
  SetBlock: 'Set',
};

export const DEFAULT_BLOCK_DESC: Record<BlockType, string> = {
  EntryBlock: 'How users enter into the flow',
  ModelBlock: 'Define state for an experience',
  FinishBlock: 'Define when the flow is finished',
  // TODO: Replace this with something good. just put stuff to fix type issues
  SetBlock: 'Groups together multiple model blocks',
};
