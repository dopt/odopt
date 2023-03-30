import { Type, Static } from '@sinclair/typebox';

export const FlowIntent = Type.Union(
  [
    Type.Literal('finish', {
      $id: 'finish_intent_flow',
      title: 'Finish_Intent',
    }),
    Type.Literal('stop', { $id: 'stop_intent', title: 'Stop_Intent' }),
    Type.Literal('reset', { $id: 'reset_intent', title: 'Reset_Intent' }),
    Type.Literal('start', { $id: 'start_intent', title: 'Start_Intent' }),
  ],
  { $id: 'FlowIntent', title: 'Flow_Intent' }
);

export type FlowIntent = Static<typeof FlowIntent>;
