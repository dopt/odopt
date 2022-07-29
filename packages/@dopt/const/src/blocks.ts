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

export const ENTRY_BLOCK_DEFAULT_DESC = 'How users enter into the journey';

export const MODEL_BLOCK_DEFAULT_DESC = 'Define state for an experience';

export const FINISH_BLOCK_DEFAULT_DESC = 'Define when the journey is finished';
