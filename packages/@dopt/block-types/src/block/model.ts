import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const BlockField = Type.Readonly(
  Type.Object({
    sid: Type.String(),
    value: Type.String(),
  })
);
export type BlockField = Static<typeof BlockField>;

export const BlockFields = Type.Readonly(Type.Array(BlockField));
export type BlockFields = Static<typeof BlockFields>;

export const ModelTypeConst = 'model';
export const ModelType = Type.Literal(ModelTypeConst);
export const ModelProps = Type.Object({
  type: Type.Readonly(ModelType),
  fields: BlockFields,
});

export const Model = Type.Intersect([Base, ModelProps]);
export type Model = Static<typeof Model>;
