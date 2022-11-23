import { Static, Type } from '@sinclair/typebox';

export const Flow = Type.Object({
  kind: Type.Readonly(Type.Literal('flow')),
  type: Type.Readonly(Type.Literal('flow')),
  uid: Type.Readonly(Type.String()),
  sid: Type.Readonly(Type.String()),
  version: Type.Readonly(Type.Number()),
  state: Type.Readonly(
    Type.Object({
      exited: Type.Boolean(),
      completed: Type.Boolean(),
    })
  ),
});
export type Flow = Static<typeof Flow>;
