import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const FinishTypeConst = 'finish';
export const FinishType = Type.Literal(FinishTypeConst);
export const FinishProps = Type.Object(
  {
    type: Type.Readonly(FinishType),
  },
  { $id: 'FinishProps' }
);

export const Finish = Type.Intersect([Base, FinishProps], { $id: 'Finish' });
export type Finish = Static<typeof Finish>;
