import { Static, Type } from '@sinclair/typebox';

export const BaseEdge = Type.Object(
  {
    kind: Type.Readonly(Type.Literal('edge')),
  },
  { $id: 'BaseEdge' }
);

export type BaseEdgeType = Static<typeof BaseEdge>;

export enum EdgeTypes {
  edge = 'edge',
  logical = 'logical',
}
