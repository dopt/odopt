import { RichText } from '@dopt/core-rich-text';
import { FIELD_VALUE_UNION_TYPE, FIELD_VALUE_LITERALS, Field } from './fields';

type SERIALIZED = string | undefined | null;

export const fieldToString = (field: FIELD_VALUE_UNION_TYPE): SERIALIZED => {
  return JSON.stringify(field);
};

export const fieldFromString = (
  string: SERIALIZED,
  type: FIELD_VALUE_LITERALS
): FIELD_VALUE_UNION_TYPE => {
  if (typeof string !== 'string' || string === 'null') {
    return null;
  }
  try {
    const value = JSON.parse(string);
    switch (type) {
      case 'number':
        return value as number;
      case 'boolean':
        return value as boolean;
      case 'string':
        return value as string;
      case 'richText':
        return value as RichText;
    }
  } catch (e) {
    throw new Error(`value: ${string} cannot be coerced into ${type}`);
  }
};

export const castField = ({
  sid,
  type,
  value,
}: {
  sid: string;
  type: FIELD_VALUE_LITERALS;
  value: FIELD_VALUE_UNION_TYPE;
}): Field => {
  switch (type) {
    case 'boolean':
      return {
        sid,
        type: 'boolean',
        value: value as boolean | null,
      };
    case 'number':
      return {
        sid,
        type: 'number',
        value: value as number | null,
      };
    case 'string':
      return {
        sid,
        type: 'string',
        value: value as string | null,
      };
    case 'richText':
      return {
        sid,
        type: 'richText',
        value: value as RichText | null,
      };
    default:
      throw new Error(
        `Attempting to cast field with type ${type} which is not supported`
      );
  }
};

export function isValueOfType(
  value: FIELD_VALUE_UNION_TYPE | undefined,
  type: FIELD_VALUE_LITERALS
): boolean {
  if (value == null || value === 'null') {
    return true;
  }
  if (
    typeof value === type ||
    (type === 'richText' && typeof value === 'object')
  ) {
    return true;
  }
  return false;
}

export function isFieldTypeLiteral(str: string): str is FIELD_VALUE_LITERALS {
  return FIELD_VALUE_LITERALS[str] !== undefined;
}
