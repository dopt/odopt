import { Static, Type } from '@sinclair/typebox';

export type FIELD_VALUE_UNION_TYPE = string | number | boolean | null;
export type FIELD_TYPE_LITERALS = 'string' | 'boolean' | 'integer';
export const FIELD_TYPE_LITERALS: Record<string, FIELD_TYPE_LITERALS> = {
  string: 'string',
  boolean: 'boolean',
  integer: 'integer',
};

const BaseField = Type.Object(
  {
    sid: Type.Readonly(Type.String()),
  },
  { $id: 'BaseField' }
);

type BaseField = Static<typeof BaseField>;

export const StringField = Type.Intersect(
  [
    BaseField,
    Type.Object({
      type: Type.Readonly(Type.Literal(FIELD_TYPE_LITERALS.string)),
      value: Type.Readonly(Type.Union([Type.String(), Type.Null()])),
    }),
  ],
  { $id: 'StringField' }
);
export type StringField = Static<typeof StringField>;

export const IntegerField = Type.Intersect(
  [
    BaseField,
    Type.Object({
      type: Type.Readonly(Type.Literal(FIELD_TYPE_LITERALS.integer)),
      value: Type.Readonly(Type.Union([Type.Integer(), Type.Null()])),
    }),
  ],
  { $id: 'IntegerField' }
);
export type IntegerField = Static<typeof IntegerField>;

export const BooleanField = Type.Intersect(
  [
    BaseField,
    Type.Object({
      type: Type.Readonly(Type.Literal(FIELD_TYPE_LITERALS.boolean)),
      value: Type.Readonly(Type.Union([Type.Boolean(), Type.Null()])),
    }),
  ],
  { $id: 'BooleanField' }
);
export type BooleanField = Static<typeof BooleanField>;

export const Field = Type.Union([StringField, IntegerField, BooleanField], {
  $id: 'Field',
});
export type Field = Static<typeof Field>;

export const Fields = Type.Array(Field);
export type Fields = Static<typeof Fields>;
