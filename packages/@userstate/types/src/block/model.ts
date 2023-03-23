import { Static, Type } from '@sinclair/typebox';
import { Nary } from './base';
import { Fields } from '../fields';

export const Model = Type.Object(
  {
    ...Nary.properties,
    type: Type.Literal('model'),
    fields: Fields,
  },
  { $id: 'Model' }
);
export type Model = Static<typeof Model>;
