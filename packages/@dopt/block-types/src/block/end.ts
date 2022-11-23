import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const EndProps = Type.Object({
  type: Type.Readonly(Type.Literal('end')),
});

export const End = Type.Intersect([Base, EndProps]);
export type End = Static<typeof End>;
