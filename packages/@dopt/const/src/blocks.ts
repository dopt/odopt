export type BlockType =
  | 'BooleanBlock'
  | 'SwitchBlock'
  | 'EmailBlock'
  | 'FinishBlock'
  | 'EntryBlock'
  | 'ModelBlock'
  | 'WaitBlock'
  | 'WebhookBlock';

export const CHARACTER_LIMIT_NAME = 100;

export const BLOCK_NAME_LENGTH_MSG = `Block name can't be more than ${CHARACTER_LIMIT_NAME} characters`;
