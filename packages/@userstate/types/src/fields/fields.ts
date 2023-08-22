import { Static, Type } from '@sinclair/typebox';
import type { Children } from '@dopt/core-rich-text';

/**
 * The supported types for a field's value: string, number, boolean, and Children.
 * This type also includes null for when the field's value is empty.
 */
export type FIELD_VALUE_UNION_TYPE =
  | string
  | number
  | boolean
  | Children
  | null;

/**
 * The literal strings corresponding to field value types, "string", "number", "boolean", and "richText".
 */
export type FIELD_VALUE_LITERALS = 'string' | 'number' | 'boolean' | 'richText';
export const FIELD_VALUE_LITERALS: Record<string, FIELD_VALUE_LITERALS> = {
  string: 'string',
  boolean: 'boolean',
  number: 'number',
  richText: 'richText',
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
      type: Type.Readonly(Type.Literal(FIELD_VALUE_LITERALS.string)),
      value: Type.Readonly(Type.Union([Type.String(), Type.Null()])),
    }),
  ],
  { $id: 'StringField' }
);
export type StringField = Static<typeof StringField>;

export const RichTextField = Type.Intersect(
  [
    BaseField,
    Type.Object({
      type: Type.Readonly(Type.Literal(FIELD_VALUE_LITERALS.richText)),
      value: Type.Readonly(
        Type.Union([
          /**
           * TODO: DOPT-3140 -- this should reflect RichText.
           * Currently, this is a simple validation passthrough
           * which doesn't reflect the schema of RichText.
           */
          Type.Array(Type.Record(Type.String(), Type.Any())),
          Type.Null(),
        ])
      ),
    }),
  ],
  { $id: 'RichTextField' }
);
export type RichTextField = Static<typeof RichTextField>;

export const NumberField = Type.Intersect(
  [
    BaseField,
    Type.Object({
      type: Type.Readonly(Type.Literal(FIELD_VALUE_LITERALS.number)),
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
      type: Type.Readonly(Type.Literal(FIELD_VALUE_LITERALS.boolean)),
      value: Type.Readonly(Type.Union([Type.Boolean(), Type.Null()])),
    }),
  ],
  { $id: 'BooleanField' }
);
export type BooleanField = Static<typeof BooleanField>;

export const Field = Type.Union(
  [StringField, NumberField, BooleanField, RichTextField],
  {
    $id: 'Field',
  }
);

/**
 * This type defines all the properties of a field.
 * A field contains:
 * - `sid`: a string, the identifier for the field
 * - `type`: a string literal, one of "string", "number", or "boolean"
 * - `value`: the value of the field, this must have type string, number, boolean, or `null` if the value is empty
 */
export type Field = Static<typeof Field>;

export const Fields = Type.Array(Field);
export type Fields = Static<typeof Fields>;

export type ComponentFieldDefinition<Keys = string> = {
  displayName: string;
  sid: Keys;
  description: string;
  type: FIELD_VALUE_LITERALS;
  initialValue: string;
};
