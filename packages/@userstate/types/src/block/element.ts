import { Static, Type } from '@sinclair/typebox';
import { OptionallyUnary } from './base';
import { Fields } from '../fields';

export const Element = Type.Object(
  {
    ...OptionallyUnary.properties,
    type: Type.Literal('element'),
    fields: Fields,
  },
  { $id: 'Element' }
);
export type Element = Static<typeof Element>;
