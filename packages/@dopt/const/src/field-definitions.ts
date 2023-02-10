import { CHARACTER_LIMIT } from './name-fields';

export const FIELD_DEFINITION_DEFAULT_DESC = 'Add a description';

export const FIELD_DEFINITION_ID_DESC =
  'This will be used to reference this field within this block and cannot be changed.';

export const FIELD_DEFINITION_ID_REQUIRED_MSG =
  'A field identifier is required';
export const FIELD_DEFINITION_ID_UNSAFE_MSG =
  'The field identifier has invalid characters';
export const FIELD_DEFINITION_ID_LENGTH_MSG = `The field identifier can't be more than ${CHARACTER_LIMIT} characters`;
export const FIELD_DEFINITION_ID_EXISTS_MSG =
  'A field with this identifier already exists';

export const FIELD_DEFINITION_EMPTY_DRAFT_MSG =
  'Add fields to define content or configuration paired with this block';

export const FIELD_DEFINITION_EMPTY_MSG = `This block doesn't have any fields`;
