import { Static, Type } from '@sinclair/typebox';

import { Block } from '../block';
export const FlowState = Type.Readonly(
  Type.Object({
    exited: Type.Boolean(),
    started: Type.Boolean(),
    completed: Type.Boolean(),
  })
);
export type FlowState = Static<typeof FlowState>;

export const Flow = Type.Object({
  kind: Type.Readonly(Type.Literal('flow')),
  type: Type.Readonly(Type.Literal('flow')),
  uid: Type.Readonly(Type.String()),
  sid: Type.Readonly(Type.String()),
  version: Type.Readonly(Type.Number()),
  state: FlowState,
  blocks: Type.Optional(Type.Array(Block)),
});
export type Flow = Static<typeof Flow>;
