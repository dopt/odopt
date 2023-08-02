import { Type, Static } from '@sinclair/typebox';

const BaseFlowIntent = [
  Type.Literal('finish', { $id: 'finish_intent', title: 'Finish_Intent' }),
  Type.Literal('stop', { $id: 'stop_intent', title: 'Stop_Intent' }),
  Type.Literal('reset', { $id: 'reset_intent', title: 'Reset_Intent' }),
  Type.Literal('start', { $id: 'start_intent', title: 'Start_Intent' }),
];

export const FlowIntent = Type.Union([...BaseFlowIntent], {
  $id: 'FlowIntent',
  title: 'Flow_Intent',
});

export type FlowIntent = Static<typeof FlowIntent>;

export const InternalFlowIntent = Type.Union(
  [
    ...BaseFlowIntent,
    Type.Literal('force-start', {
      $id: 'start_intent',
      title: 'Force_Start_Intent',
    }),
    Type.Literal('force-reset', {
      $id: 'reset_intent',
      title: 'Force_Reset_Intent',
    }),
  ],
  {
    $id: 'InternalFlowIntent',
    title: 'Internal_Flow_Intent',
  }
);

export type InternalFlowIntent = Static<typeof InternalFlowIntent>;
