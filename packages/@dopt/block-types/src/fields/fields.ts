import { Static, Type } from '@sinclair/typebox';

export type FIELD_VALUE_UNION_TYPE = string | number | boolean | null;
export type FIELD_TYPE_LITERALS = 'string' | 'boolean' | 'number';
export const FIELD_TYPE_LITERALS: Record<string, FIELD_TYPE_LITERALS> = {
  string: 'string',
  boolean: 'boolean',
  number: 'number',
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

export const NumberField = Type.Intersect(
  [
    BaseField,
    Type.Object({
      type: Type.Readonly(Type.Literal(FIELD_TYPE_LITERALS.number)),
      value: Type.Readonly(Type.Union([Type.Number(), Type.Null()])),
    }),
  ],
  { $id: 'NumberField' }
);
export type NumberField = Static<typeof NumberField>;

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

export const Field = Type.Union([StringField, NumberField, BooleanField], {
  $id: 'Field',
});
export type Field = Static<typeof Field>;

export const Fields = Type.Array(Field);
export type Fields = Static<typeof Fields>;
