import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const EntryProps = Type.Object({
  type: Type.Readonly(Type.Literal('entry')),
  expression: Type.Optional(Type.Function([], Type.Promise(Type.Boolean()))),
});

export const Entry = Type.Intersect([Base, EntryProps]);
export type Entry = Static<typeof Entry>;
