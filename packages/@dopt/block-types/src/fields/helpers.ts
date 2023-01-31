import { Static, Type } from '@sinclair/typebox';
import { FIELD_VALUE_UNION_TYPE, FIELD_TYPE_LITERALS, Field } from './fields';

type SERIALIZED = string | null;

export const fieldToString = (field: FIELD_VALUE_UNION_TYPE): SERIALIZED => {
  return field == null ? null : JSON.stringify(field);
};

export const fieldFromString = (string: SERIALIZED): FIELD_VALUE_UNION_TYPE => {
  if (typeof string !== 'string') {
    return null;
  }

  try {
    const value = JSON.parse(string);
    switch (typeof value) {
      case 'number':
        return value as number;
      case 'boolean':
        return value as boolean;
      case 'string':
        return value as string;
      default:
        return null;
    }
  } catch (e) {
    return null;
  }
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
