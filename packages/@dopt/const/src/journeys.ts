export const DEFAULT_JOURNEY_DESC = 'Add a description';

export const JOURNEY_IDENTIFIER_DESC =
  'This will be used to reference this flow and cannot be changed.';

export const CHARACTER_LIMIT = 100;
export const URL_SAFE_REGEX = /^[\w.~-]*$/;
export const URL_UNSAFE_REGEX = /[^\w.~-]+/g;

export const NAME_REQUIRED = 'Name is required';
export const IDENTIFIER_REQUIRED_MSG = 'Identifier is required';
export const ALLOWED_CHARS_MSG = `Invalid identifier`;
export const NAME_LENGTH_MSG = `Name can't be more than ${CHARACTER_LIMIT} characters`;
export const IDENTIFIER_LENGTH_MSG = `Identifier can't be more than ${CHARACTER_LIMIT} characters`;

export const DISABLE_JOURNEY_MSG =
  'Disabling the flow will prevent any users from entering or progressing in the flow.';
export const ENABLE_JOURNEY_MSG =
  'Enabling the flow will allow users to enter and progress in the flow.';

export const ENABLED_DISPLAY_STR = 'Enabled';
export const DISABLED_DISPLAY_STR = 'Disabled';

export enum MIGRATION_STRATEGY {
  reset = 'Reset',
  exit = 'Exit',
}
