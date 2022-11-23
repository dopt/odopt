import { Type, Static } from '@sinclair/typebox';

export const FlowIntent = Type.Union([
  Type.Literal('start'),
  Type.Literal('exit'),
  Type.Literal('stop'),
  Type.Literal('reset'),
]);

export const BlockIntent = Type.Union([
  Type.Literal('complete'),
  Type.Literal('prev'),
  Type.Literal('next'),
]);

export type FlowIntent = Static<typeof FlowIntent>;
export type BlockIntent = Static<typeof BlockIntent>;
