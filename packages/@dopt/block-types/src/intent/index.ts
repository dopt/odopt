import { Type, Static } from '@sinclair/typebox';

export const FlowIntent = Type.Union([
  Type.Literal('complete'),
  Type.Literal('exit'),
  Type.Literal('reset'),
  Type.Literal('start'),
]);

export const BlockIntent = Type.Union([
  Type.Literal('complete'),
  Type.Literal('next'),
  Type.Literal('prev'),
  Type.Literal('goTo'),
]);

export type FlowIntent = Static<typeof FlowIntent>;
export type BlockIntent = Static<typeof BlockIntent>;
