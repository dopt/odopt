import { CHARACTER_LIMIT } from './name-fields';

export const PROPERTY_DEFINITION_DEFAULT_DESC = 'Add a description';

export const PROPERTY_DEFINITION_ID_DESC =
  'This will be used to reference this property within this block and cannot be changed.';

export const PROPERTY_DEFINITION_ID_REQUIRED_MSG =
  'A property identifier is required';
export const PROPERTY_DEFINITION_ID_UNSAFE_MSG =
  'The property identifier has invalid characters';
export const PROPERTY_DEFINITION_ID_LENGTH_MSG = `The property identifier can't be more than ${CHARACTER_LIMIT} characters`;
export const PROPERTY_DEFINITION_ID_EXISTS_MSG =
  'A property with this identifier already exists';
