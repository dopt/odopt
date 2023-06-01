import {
  Model as UserStateTypeModel,
  Flow as UserStateTypeFlow,
  Fields as UserStateTypeFields,
  Field as UserStateTypeField,
  FlowIntent as UserStateTypeFlowIntent,
  BlockTypes,
  BLOCK_TYPES,
} from '@userstate/types';

import { Type, Static } from '@sinclair/typebox';

export const Fields = UserStateTypeFields;
export type Fields = UserStateTypeFields;

export const Field = UserStateTypeField;
export type Field = UserStateTypeField;

export const BLOCK_API_TYPES = {
  custom: 'custom' as const,
  modal: 'modal' as const,
  checklist: 'checklist' as const,
  checklistItem: 'checklistItem' as const,
};

export const Block = Type.Object(
  {
    ...UserStateTypeModel.properties,
    type: Type.Union(
      /**
       * Iteration over Object.values works here
       * because each value is declared as a constant
       * in BLOCK_API_TYPES above.
       */
      Object.values(BLOCK_API_TYPES).map((value) => Type.Literal(value))
    ),
  },
  { $id: 'Block' }
);
export type Block = Static<typeof Block>;

export function getBlockApiType(type: BlockTypes): Block['type'] {
  if (type === BLOCK_TYPES.model) {
    return BLOCK_API_TYPES.custom;
  } else if (type === BLOCK_TYPES.modal) {
    return BLOCK_API_TYPES.modal;
  } else if (type === BLOCK_TYPES.checklist) {
    return BLOCK_API_TYPES.checklist;
  } else if (type === BLOCK_TYPES.checklistItem) {
    return BLOCK_API_TYPES.checklistItem;
  }

  throw new Error(`${type} is not a supported block type for the API`);
}

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

export const Transitions = Type.Object({
  transitions: Type.Array(Type.String(), { minItems: 1, uniqueItems: true }),
});
export type Transitions = {
  transitions: [string, ...string[]];
};

export const INTENT_SIDE_EFFECT_HEADER = 'X-Dopt-Intent-Side-Effects';
export const SOCKET_PATH = '/v2/socket/';
