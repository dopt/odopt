import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const ModelTypeConst = 'model';
export const ModelType = Type.Literal(ModelTypeConst);
export const ModelProps = Type.Object({
  type: Type.Readonly(ModelType),
});

export const Model = Type.Intersect([Base, ModelProps]);
export type Model = Static<typeof Model>;
