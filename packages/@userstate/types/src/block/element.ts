import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';
import { Fields } from '../fields';

export const Element = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('element'),
    fields: Fields,
  },
  { $id: 'Element' }
);
export type Element = Static<typeof Element>;
