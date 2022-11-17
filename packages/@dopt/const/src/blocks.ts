export type BlockTable =
  | 'FinishBlock'
  | 'EntryBlock'
  | 'ModelBlock'
  | 'SetBlock';

export const DEFAULT_BLOCK_NAMES: Record<BlockTable, string> = {
  EntryBlock: 'Start',
  ModelBlock: 'Step',
  FinishBlock: 'Finish',
  SetBlock: 'Set',
};

export const DEFAULT_BLOCK_DESC: Record<BlockTable, string> = {
  EntryBlock: 'How users enter into the flow',
  ModelBlock: 'Define state for an experience',
  FinishBlock: 'Define when the flow is finished',
  // TODO: Replace this with something good. just put stuff to fix type issues
  SetBlock: 'Groups together multiple model blocks',
};
