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

export type FlowIntent = Static<typeof FlowIntent>;
