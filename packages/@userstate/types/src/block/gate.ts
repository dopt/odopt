import { Static, Type } from '@sinclair/typebox';
import { Nary } from './base';

export const Gate = Type.Object(
  {
    ...Nary.properties,
    type: Type.Literal('gate'),
  },
  { $id: 'Gate' }
);
export type Gate = Static<typeof Gate>;
