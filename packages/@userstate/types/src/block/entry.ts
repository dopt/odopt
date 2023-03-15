import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';

export const Entry = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('entry'),
    expression: Type.Function([], Type.Promise(Type.Boolean())),
  },
  { $id: 'Entry' }
);
export type Entry = Static<typeof Entry>;
