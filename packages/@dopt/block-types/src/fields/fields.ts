import { Static, Type } from '@sinclair/typebox';

export const STRING_FIELD_TYPE_CONST = 'string';
export const BOOLEAN_FIELD_TYPE_CONST = 'boolean';
export const INTEGER_FIELD_TYPE_CONST = 'integer';

export type FIELD_VALUE_UNION_TYPE = string | number | boolean | null;
export type FIELD_TYPE_LITERALS = 'string' | 'boolean' | 'integer';

const BaseField = Type.Object({
  sid: Type.Readonly(Type.String()),
});

type BaseField = Static<typeof BaseField>;

export const StringField = Type.Intersect([
  BaseField,
  Type.Object({
    type: Type.Readonly(Type.Literal(STRING_FIELD_TYPE_CONST)),
    value: Type.Readonly(Type.Union([Type.String(), Type.Null()])),
  }),
]);
export type StringField = Static<typeof StringField>;

export const IntegerField = Type.Intersect([
  BaseField,
  Type.Object({
    type: Type.Readonly(Type.Literal(INTEGER_FIELD_TYPE_CONST)),
    value: Type.Readonly(Type.Union([Type.Integer(), Type.Null()])),
  }),
]);
export type IntegerField = Static<typeof IntegerField>;

export const BooleanField = Type.Intersect([
  BaseField,
  Type.Object({
    type: Type.Readonly(Type.Literal(BOOLEAN_FIELD_TYPE_CONST)),
    value: Type.Readonly(Type.Union([Type.Boolean(), Type.Null()])),
  }),
]);
export type BooleanField = Static<typeof BooleanField>;

export const Field = Type.Union([StringField, IntegerField, BooleanField]);
export type Field = Static<typeof Field>;

export const Fields = Type.Array(Field);
export type Fields = Static<typeof Fields>;
