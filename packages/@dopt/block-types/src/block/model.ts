import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const BlockProperty = Type.Readonly(
  Type.Object({
    sid: Type.String(),
    value: Type.String(),
  })
);
export type BlockProperty = Static<typeof BlockProperty>;

export const BlockProperties = Type.Readonly(Type.Array(BlockProperty));
export type BlockProperties = Static<typeof BlockProperties>;

export const ModelTypeConst = 'model';
export const ModelType = Type.Literal(ModelTypeConst);
export const ModelProps = Type.Object({
  type: Type.Readonly(ModelType),
  properties: BlockProperties,
});

export const Model = Type.Intersect([Base, ModelProps]);
export type Model = Static<typeof Model>;
