import { Type, Static } from '@sinclair/typebox';

export const FlowIntent = Type.Union(
  [
    Type.Literal('complete', {
      $id: 'complete_intent_flow',
      title: 'Complete_Intent',
    }),
    Type.Literal('exit', { $id: 'exit_intent', title: 'Exit_Intent' }),
    Type.Literal('reset', { $id: 'reset_intent', title: 'Reset_Intent' }),
    Type.Literal('start', { $id: 'start_intent', title: 'Start_Intent' }),
  ],
  { $id: 'FlowIntent', title: 'Flow_Intent' }
);

export const BlockIntent = Type.Union(
  [
    Type.Literal('complete', {
      $id: 'complete_intent_block',
      title: 'Complete_Intent',
    }),
    Type.Literal('next', { $id: 'next_intent', title: 'Next_Intent' }),
    Type.Literal('prev', { $id: 'prev_intent', title: 'Prev_Intent' }),
    Type.Literal('goTo', { $id: 'goTo_intent', title: 'GoTo_Intent' }),
  ],
  { $id: 'BlockIntent', title: 'Block_Intent' }
);

export type FlowIntent = Static<typeof FlowIntent>;
export type BlockIntent = Static<typeof BlockIntent>;
