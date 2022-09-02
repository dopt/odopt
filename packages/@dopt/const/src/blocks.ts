export type BlockType =
  | 'BooleanBlock'
  | 'SwitchBlock'
  | 'EmailBlock'
  | 'FinishBlock'
  | 'EntryBlock'
  | 'ModelBlock'
  | 'WaitBlock'
  | 'WebhookBlock';

export const DEFAULT_BLOCK_NAMES: Record<BlockType, string> = {
  EntryBlock: 'Entry trigger',
  ModelBlock: 'Model',
  FinishBlock: 'Finish',
  SwitchBlock: 'Switch',
  BooleanBlock: 'Boolean',
  EmailBlock: 'Email',
  WaitBlock: 'Wait',
  WebhookBlock: 'Webhook',
};

export const DEFAULT_BLOCK_DESC: Record<BlockType, string> = {
  EntryBlock: 'How users enter into the journey',
  ModelBlock: 'Define state for an experience',
  FinishBlock: 'Define when the journey is finished',
  SwitchBlock: 'Switch',
  BooleanBlock: 'Boolean',
  EmailBlock: 'Email',
  WaitBlock: 'Wait',
  WebhookBlock: 'Webhook',
};
