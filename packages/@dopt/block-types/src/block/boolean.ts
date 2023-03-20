import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const BooleanTypeConst = 'boolean';
export const BooleanType = Type.Literal(BooleanTypeConst);
export const BooleanProps = Type.Object(
  {
    type: Type.Readonly(BooleanType),
    expression: Type.Function([], Type.Promise(Type.Boolean())),
  },
  { $id: 'BooleanProps' }
);

export const Boolean = Type.Intersect([Base, BooleanProps], { $id: 'Boolean' });
export type Boolean = Static<typeof Boolean>;
