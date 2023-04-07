import {
  Model as UserStateTypeModel,
  Flow as UserStateTypeFlow,
  Fields as UserStateTypeFields,
  Field as UserStateTypeField,
  FlowIntent as UserStateTypeFlowIntent,
} from '@userstate/types';

import { Type, Static } from '@sinclair/typebox';

export const Model = UserStateTypeModel;
export type Model = Static<typeof Model>;

export const Fields = UserStateTypeFields;
export type Fields = UserStateTypeFields;

export const Field = UserStateTypeField;
export type Field = UserStateTypeField;

export const Block = Model;
export type Block = Model;

export const FlowIntent = UserStateTypeFlowIntent;
export type FlowIntent = UserStateTypeFlowIntent;

export const Flow = Type.Object(
  {
    ...UserStateTypeFlow.properties,
    blocks: Type.Optional(Type.Array(Block)),
  },
  { $id: 'Flow' }
);

export type Flow = Static<typeof Flow>;

export const BLOCK_TYPES = {
  model: Model.properties.type.const,
} as const;

export const Transitions = Type.Object({
  transitions: Type.Array(Type.String(), { minItems: 1, uniqueItems: true }),
});
export type Transitions = {
  transitions: [string, ...string[]];
};

export const INTENT_SIDE_EFFECT_HEADER = 'X-Dopt-Intent-Side-Effects';
