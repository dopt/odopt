import { Static, Type } from '@sinclair/typebox';
import { Binary, Nary } from './base';

export const Boolean = Type.Object(
  {
    ...Binary.properties,
    type: Type.Literal('boolean'),
    expression: Type.Function(
      Type.Tuple([Type.Array(Nary)]),
      Type.Promise(Type.Boolean())
    ),
  },
  { $id: 'Boolean' }
);
export type Boolean = Static<typeof Boolean>;
