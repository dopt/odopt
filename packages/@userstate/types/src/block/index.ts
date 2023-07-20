import { Type, Static } from '@sinclair/typebox';
import { Finish } from './finish';
import { Entry } from './entry';
import { Gate } from './gate';

import { Boolean as BooleanType } from './boolean';
import { Model } from './model';
import { Modal } from './modal';
import { Card } from './card';
import { Webhook } from './webhook';
import { Nary } from './base';
import { ContainerStart, ContainerEnd } from './container';
import { Checklist, ChecklistItem } from './checklist';
import { Tour, TourItem } from './tour';

export * from './entry';
export * from './finish';
export * from './boolean';
export * from './model';
export * from './modal';
export * from './card';
export * from './webhook';
export * from './gate';
export * from './checklist';
export * from './tour';
export * from './container';

export const BLOCK_TYPES = {
  entry: Entry.properties.type.const,
  boolean: BooleanType.properties.type.const,
  model: Model.properties.type.const,
  finish: Finish.properties.type.const,
  webhook: Webhook.properties.type.const,
  gate: Gate.properties.type.const,
  card: Card.properties.type.const,
  modal: Modal.properties.type.const,
  containerStart: ContainerStart.properties.type.const,
  containerEnd: ContainerEnd.properties.type.const,
  checklist: Checklist.properties.type.const,
  checklistItem: ChecklistItem.properties.type.const,
  tour: Tour.properties.type.const,
  tourItem: TourItem.properties.type.const,
} as const;

export const BlockTypes = Type.Union([
  Entry.properties.type,
  BooleanType.properties.type,
  Model.properties.type,
  Finish.properties.type,
  Webhook.properties.type,
  Gate.properties.type,
  Card.properties.type,
  Modal.properties.type,
  ContainerStart.properties.type,
  ContainerEnd.properties.type,
  Checklist.properties.type,
  ChecklistItem.properties.type,
  Tour.properties.type,
  TourItem.properties.type,
]);
export type BlockTypes = Static<typeof BlockTypes>;

export const Block = Type.Union(
  [
    Type.Ref(Model),
    Type.Ref(Entry),
    Type.Ref(BooleanType),
    Type.Ref(Finish),
    Type.Ref(Webhook),
    Type.Ref(Gate),
    Type.Ref(Card),
    Type.Ref(Modal),
    Type.Ref(ContainerStart),
    Type.Ref(ContainerEnd),
    Type.Ref(Checklist),
    Type.Ref(ChecklistItem),
    Type.Ref(Tour),
    Type.Ref(TourItem),
  ],
  { $id: 'Block' }
);

/**
 * This union type encapsulates all allowed block types.
 * It is a type alias which matches the Type.Union typebox type.
 */
export type Block =
  | Finish
  | Entry
  | BooleanType
  | Model
  | Webhook
  | Gate
  | Card
  | Modal
  | ContainerStart
  | ContainerEnd
  | Checklist
  | ChecklistItem
  | Tour
  | TourItem;

export const Blocks = Type.Array(Type.Ref(Block));
export type Blocks = Static<typeof Blocks>;

export function isExternalBlock(type: BlockTypes) {
  return (
    type === BLOCK_TYPES.model ||
    type === BLOCK_TYPES.modal ||
    type === BLOCK_TYPES.card ||
    type === BLOCK_TYPES.checklist ||
    type === BLOCK_TYPES.checklistItem ||
    type === BLOCK_TYPES.tour ||
    type === BLOCK_TYPES.tourItem
  );
}

export type ExternalBlock =
  | Model
  | Modal
  | Card
  | Checklist
  | ChecklistItem
  | Tour
  | TourItem;

function getDefaultTransition(props: Pick<Nary, 'transitioned'>): {
  default: boolean;
} {
  const defaultTransition = Object.entries(props.transitioned).filter(
    ([name]) => name === 'default'
  );
  const defaultTransitionValue = {
    default: false,
  };
  if (defaultTransition.length) {
    defaultTransitionValue.default = defaultTransition[0][1];
  }
  return defaultTransitionValue;
}

function getContainerUid({
  containerUid,
  type,
}: {
  containerUid?: string | undefined;
  type: BlockTypes;
}): string {
  if (!containerUid) {
    throw new Error(`containerUid must be defined for type: ${type}`);
  }

  return containerUid;
}

export function getDefaultBlock(
  props: Partial<Omit<Nary, 'kind'>> & { type: BlockTypes } & Pick<
      Nary,
      'version' | 'uid' | 'sid' | 'containerUid'
    >
): Block {
  const defaultState = {
    active: false,
    entered: false,
    exited: false,
    ...props.state,
  };
  const { transitioned } = { transitioned: props.transitioned || {} };
  switch (props.type) {
    case 'model':
      return {
        kind: 'block',
        fields: [],
        transitioned: getDefaultTransition({ transitioned }),
        state: defaultState,
        ...props,
        type: 'model',
      };
    case 'webhook':
      return {
        ...props,
        type: 'webhook',
        kind: 'block',
        state: defaultState,
        transitioned: getDefaultTransition({ transitioned }),
        request: async () => ({
          ok: true,
          redirected: false,
          status: 204,
          statusText: '',
          url: '',
        }),
      };
    case 'entry':
      return {
        ...props,
        type: 'entry',
        kind: 'block',
        state: defaultState,
        transitioned: getDefaultTransition({ transitioned }),
        expression: async () => false,
      };
    case 'finish':
      return {
        ...props,
        state: defaultState,
        transitioned: {},
        type: 'finish',
        kind: 'block',
      };
    case 'gate':
      return {
        kind: 'block',
        transitioned: getDefaultTransition({ transitioned }),
        state: defaultState,
        ...props,
        type: 'gate',
      };
    case 'boolean':
      return {
        ...props,
        type: 'boolean',
        kind: 'block',
        state: defaultState,
        transitioned: {
          ...{ true: false, false: false },
          ...transitioned,
        },
        expression: async () => false,
      };
    case 'card':
      return {
        kind: 'block',
        fields: [],
        ...props,
        state: defaultState,
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        type: 'card',
      };
    case 'modal':
      return {
        kind: 'block',
        fields: [],
        ...props,
        state: defaultState,
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        type: 'modal',
      };
    case 'checklist':
      return {
        kind: 'block',
        fields: [],
        ...props,
        state: defaultState,
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        type: 'checklist',
      };
    case 'checklistItem':
      return {
        kind: 'block',
        fields: [],
        ...props,
        state: defaultState,
        transitioned: {
          ...{ complete: false, skip: false },
          ...transitioned,
        },
        containerUid: getContainerUid(props),
        type: 'checklistItem',
      };
    case 'tour':
      return {
        kind: 'block',
        fields: [],
        ...props,
        state: defaultState,
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        type: 'tour',
      };
    case 'tourItem':
      return {
        kind: 'block',
        fields: [],
        ...props,
        state: defaultState,
        transitioned: {
          ...{ next: false, previous: false },
          ...transitioned,
        },
        containerUid: getContainerUid(props),
        type: 'tourItem',
      };
    case 'containerEnd':
      return {
        kind: 'block',
        ...props,
        state: defaultState,
        transitioned: {},
        containerUid: getContainerUid(props),
        type: 'containerEnd',
      };
    case 'containerStart':
      return {
        kind: 'block',
        ...props,
        state: defaultState,
        transitioned: getDefaultTransition({ transitioned }),
        containerUid: getContainerUid(props),
        type: 'containerStart',
      };
  }
}
