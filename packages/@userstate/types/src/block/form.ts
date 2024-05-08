import { Static, Type } from '@sinclair/typebox';
import { Model } from './model';

export const Form = Type.Object(
  {
    ...Model.properties,
    type: Type.Literal('form'),
    transitioned: Type.Object({
      complete: Type.Boolean(),
      dismiss: Type.Boolean(),
    }),
  },
  { $id: 'Form' }
);
export type Form = Static<typeof Form>;
