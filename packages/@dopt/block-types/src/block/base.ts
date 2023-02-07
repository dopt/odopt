import { Static, Type } from '@sinclair/typebox';

export const BlockState = Type.Readonly(
  Type.Object({
    active: Type.Boolean(),
    completed: Type.Boolean(),
  })
);
export type BlockState = Static<typeof BlockState>;

export const Base = Type.Object({
  kind: Type.Readonly(Type.Literal('block')),
  uid: Type.Readonly(Type.String()),
  sid: Type.Readonly(Type.String()),
  version: Type.Readonly(Type.Number()),
  state: BlockState,
});

export type BaseType = Static<typeof Base>;
