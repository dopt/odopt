import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';
import { Element } from './index';

export const SetTypeConst = 'set';
export const SetType = Type.Literal(SetTypeConst);
export const SetProps = Type.Object({
  length: Type.Optional(Type.Number()),
  blocks: Type.Optional(Type.Array(Element)),
  type: Type.Readonly(SetType),
  ordered: Type.Optional(Type.Boolean()),
});

export const Set = Type.Intersect([Base, SetProps]);
export type Set = Static<typeof Set>;
