import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const FinishTypeConst = 'finish';
export const FinishType = Type.Literal(FinishTypeConst);
export const FinishProps = Type.Object({
  type: Type.Readonly(FinishType),
});

export const Finish = Type.Intersect([Base, FinishProps]);
export type Finish = Static<typeof Finish>;
