import { Static, Type } from '@sinclair/typebox';
import { Block } from '../block';

export const Edge = Type.Object(
  {
    kind: Type.Literal('edge'),
    type: Type.Literal('edge'),
    value: Type.Tuple([Block, Block]),
    input: Type.String(),
  },
  { $id: 'Edge' }
);

export type Edge = Static<typeof Edge>;
