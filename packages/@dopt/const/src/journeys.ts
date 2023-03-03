import { CHARACTER_LIMIT } from './name-fields';

export const DEFAULT_JOURNEY_DESC = 'Add a description';

export const JOURNEY_IDENTIFIER_DESC =
  'This will be used to reference this flow and cannot be changed.';

export const FLOW_IDENTIFIER_REQUIRED_MSG = 'An identifier is required';
export const FLOW_IDENTIFIER_ALLOWED_CHARS_MSG =
  'Identifiers can only contain alphanumeric characters, "_", "-", ".", or "~"';
export const FLOW_IDENTIFIER_LENGTH_MSG = `Identifiers can't be longer than ${CHARACTER_LIMIT} characters`;
export const FLOW_NAME_EXISTS_MSG = 'A flow with this name already exists';
export const FLOW_IDENTIFIER_EXISTS_MSG =
  'A flow with this identifier already exists';

export const DISABLE_JOURNEY_MSG =
  'Disabling the flow will prevent any users from entering or progressing in the flow.';
export const ENABLE_JOURNEY_MSG =
  'Enabling the flow will allow users to enter and progress in the flow.';

export const ENABLED_DISPLAY_STR = 'Enabled';
export const DISABLED_DISPLAY_STR = 'Disabled';

export enum MIGRATION_STRATEGY {
  restart = 'Restart',
  exit = 'Exit',
}
