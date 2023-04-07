import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const GateTypeConst = 'gate';
export const GateType = Type.Literal(GateTypeConst);
export const GateProps = Type.Object(
  {
    type: Type.Readonly(GateType),
  },
  { $id: 'GateProps' }
);

export const Gate = Type.Intersect([Base, GateProps], { $id: 'Gate' });
export type Gate = Static<typeof Gate>;
