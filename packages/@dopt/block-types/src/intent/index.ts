import { Type, Static } from '@sinclair/typebox';

export const FlowIntent = Type.Union(
  [
    Type.Literal('complete', { title: 'Complete_Intent' }),
    Type.Literal('exit', { title: 'Exit_Intent' }),
    Type.Literal('reset', { title: 'Reset_Intent' }),
    Type.Literal('start', { title: 'Start_Intent' }),
  ],
  { $id: 'FlowIntent', title: 'Flow_Intent' }
);

export const BlockIntent = Type.Union(
  [
    Type.Literal('complete', { title: 'Complete_Intent' }),
    Type.Literal('next', { title: 'Next_Intent' }),
    Type.Literal('prev', { title: 'Prev_Intent' }),
    Type.Literal('goTo', { title: 'GoTo_Intent' }),
  ],
  { $id: 'BlockIntent', title: 'Block_Intent' }
);

export type FlowIntent = Static<typeof FlowIntent>;
export type BlockIntent = Static<typeof BlockIntent>;
