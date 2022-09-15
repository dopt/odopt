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
  EntryBlock: 'Start',
  ModelBlock: 'Step',
  FinishBlock: 'Finish',
  SwitchBlock: 'Switch',
  BooleanBlock: 'Boolean',
  EmailBlock: 'Email',
  WaitBlock: 'Wait',
  WebhookBlock: 'Webhook',
};

export const DEFAULT_BLOCK_DESC: Record<BlockType, string> = {
  EntryBlock: 'How users enter into the flow',
  ModelBlock: 'Define state for an experience',
  FinishBlock: 'Define when the flow is finished',
  SwitchBlock: 'Switch',
  BooleanBlock: 'Boolean',
  EmailBlock: 'Email',
  WaitBlock: 'Wait',
  WebhookBlock: 'Webhook',
};
