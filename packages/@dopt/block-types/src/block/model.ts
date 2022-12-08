import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const ModelProps = Type.Object({
  type: Type.Readonly(Type.Literal('model')),
});

export const Model = Type.Intersect([Base, ModelProps]);
export type Model = Static<typeof Model>;
