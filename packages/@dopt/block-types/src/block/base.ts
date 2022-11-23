import { Type } from '@sinclair/typebox';

export const Base = Type.Object({
  kind: Type.Readonly(Type.Literal('block')),
  uid: Type.Readonly(Type.String()),
  sid: Type.Readonly(Type.String()),
  version: Type.Readonly(Type.Number()),
  state: Type.Readonly(
    Type.Object({
      active: Type.Boolean(),
      completed: Type.Boolean(),
    })
  ),
});
