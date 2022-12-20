import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const SetTypeConst = 'set';
export const SetType = Type.Literal(SetTypeConst);
export const SetProps = Type.Object({
  type: Type.Readonly(SetType),
});

export const Set = Type.Intersect([Base, SetProps]);
export type Set = Static<typeof Set>;
