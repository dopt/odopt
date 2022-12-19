import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const FinishProps = Type.Object({
  type: Type.Readonly(Type.Literal('finish')),
});

export const Finish = Type.Intersect([Base, FinishProps]);
export type Finish = Static<typeof Finish>;
