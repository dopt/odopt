import { Type } from '@sinclair/typebox';

export const EntryProps = Type.Object({
  type: Type.Readonly(Type.Literal('entry')),
  expression: Type.Function([], Type.Promise(Type.Boolean())),
});
