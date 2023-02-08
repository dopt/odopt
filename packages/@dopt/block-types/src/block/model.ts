import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';
import { Fields } from '../fields';

export const ModelTypeConst = 'model';
export const ModelType = Type.Literal(ModelTypeConst);
export const ModelProps = Type.Object(
  {
    type: Type.Readonly(ModelType),
    fields: Type.Readonly(Fields),
  },
  { $id: 'ModelProps' }
);

export const Model = Type.Intersect([Base, ModelProps], { $id: 'Model' });
export type Model = Static<typeof Model>;
