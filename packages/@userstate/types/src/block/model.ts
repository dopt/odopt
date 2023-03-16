import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';
import { Fields } from '../fields';

export const Model = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('model'),
    fields: Fields,
  },
  { $id: 'Model' }
);
export type Model = Static<typeof Model>;
