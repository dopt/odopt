import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';

export const FlowTrigger = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('flowTrigger'),
    request: Type.Function([], Type.Unknown()),
  },
  { $id: 'FlowTrigger' }
);
export type FlowTrigger = Static<typeof FlowTrigger>;
