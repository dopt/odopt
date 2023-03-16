import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';
import { Element } from './index';

export const Set = Type.Object(
  {
    ...Unary.properties,
    size: Type.Number(),
    blocks: Type.Array(Element),
    type: Type.Literal('set'),
    ordered: Type.Optional(Type.Boolean()),
  },
  { $id: 'Set' }
);
/**
 * This type defines all the properties of a group (`set`) block.
 * In addition to all the attributes of a regular step (or `model`) block,
 * a group block also contains:
 * - `size`: a number, the number of children blocks it encapsulates
 * - `ordered`: a boolean, whether the group is ordered or unordered
 * - `blocks`: an array, the array of all its child blocks
 */
export type Set = Static<typeof Set>;
