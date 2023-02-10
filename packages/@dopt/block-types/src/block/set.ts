import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';
import { Model } from './index';

export const SetTypeConst = 'set';
export const SetType = Type.Literal(SetTypeConst);
export const SetProps = Type.Object(
  {
    size: Type.Number(),
    blocks: Type.Array(Type.Ref(Model)),
    type: Type.Readonly(SetType),
    ordered: Type.Optional(Type.Boolean()),
  },
  { $id: 'SetProps' }
);

export const Set = Type.Intersect([Base, SetProps], { $id: 'Group' });
export type Set = Static<typeof Set>;
