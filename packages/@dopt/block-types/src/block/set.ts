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

/**
 * This type defines all the properties of a group (`set`) block.
 * In addition to all the attributes of a regular step (or `model`) block,
 * a group block also contains:
 * - `size`: a number, the number of children blocks it encapsulates
 * - `ordered`: a boolean, whether the group is ordered or unordered
 * - `blocks`: an array, the array of all its child blocks
 */
export type Set = Static<typeof Set>;
