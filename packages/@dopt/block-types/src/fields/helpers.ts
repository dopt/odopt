import { FIELD_VALUE_UNION_TYPE, FIELD_TYPE_LITERALS, Field } from './fields';

type SERIALIZED = string | null;

export const fieldToString = (field: FIELD_VALUE_UNION_TYPE): SERIALIZED => {
  return field == null ? null : JSON.stringify(field);
};

export const fieldFromString = (
  string: SERIALIZED,
  type: FIELD_TYPE_LITERALS
): FIELD_VALUE_UNION_TYPE => {
  if (typeof string !== 'string') {
    return null;
  }
  try {
    const value = JSON.parse(string);
    switch (type) {
      case 'integer':
        return value as number;
      case 'boolean':
        return value as boolean;
      case 'string':
        return value as string;
    }
  } catch (e) {
    throw new Error(`value :${string} cannot be coerced into ${type}`);
  }
};

export const integerFromField = (
  field: FIELD_VALUE_UNION_TYPE
): number | undefined => {
  return Math.floor(Number(field)) || undefined;
};

export const castField = ({
  sid,
  type,
  value,
}: {
  sid: string;
  type: FIELD_TYPE_LITERALS;
  value: FIELD_VALUE_UNION_TYPE;
}): Field => {
  switch (type) {
    case 'boolean':
      return {
        sid,
        type: 'boolean',
        value: value as boolean | null,
      };
    case 'integer':
      return {
        sid,
        type: 'integer',
        value: value as number | null,
      };
    case 'string':
      return {
        sid,
        type: 'string',
        value: value as string | null,
      };
    default:
      throw new Error(
        `Attempting to cast field with type ${type} which is not supported`
      );
  }
};

export function isValueOfType(
  value: FIELD_VALUE_UNION_TYPE | undefined,
  type: FIELD_TYPE_LITERALS
): boolean {
  if (value == null) {
    return true;
  }
  if (type === 'integer' && Number.isInteger(value)) {
    return true;
  } else if (typeof value === type) {
    return true;
  }
  return false;
}

export function isFieldTypeLiteral(str: string): str is FIELD_TYPE_LITERALS {
  return FIELD_TYPE_LITERALS[str] !== undefined;
}
