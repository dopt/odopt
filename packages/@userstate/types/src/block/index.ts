import { Type, Static } from '@sinclair/typebox';
import { Finish } from './finish';
import { Entry } from './entry';
import { Gate } from './gate';

import { Boolean as BooleanType } from './boolean';
import { Model } from './model';
import { Modal } from './modal';
import { Card } from './card';
import { Webhook } from './webhook';
import { FlowTrigger } from './flow-trigger';
import { Nary } from './base';
import { ContainerStart, ContainerEnd } from './container';
import { Checklist, ChecklistItem } from './checklist';
import { Hints, HintsItem } from './hints';
import { Tour, TourItem } from './tour';

export { Nary } from './base';
export * from './entry';
export * from './finish';
export * from './boolean';
export * from './model';
export * from './modal';
export * from './card';
export * from './webhook';
export * from './flow-trigger';
export * from './gate';
export * from './checklist';
export * from './hints';
export * from './tour';
export * from './container';

export const BLOCK_TYPES = {
  entry: Entry.properties.type.const,
  boolean: BooleanType.properties.type.const,
  model: Model.properties.type.const,
  finish: Finish.properties.type.const,
  webhook: Webhook.properties.type.const,
  flowTrigger: FlowTrigger.properties.type.const,
  gate: Gate.properties.type.const,
  card: Card.properties.type.const,
  modal: Modal.properties.type.const,
  containerStart: ContainerStart.properties.type.const,
  containerEnd: ContainerEnd.properties.type.const,
  checklist: Checklist.properties.type.const,
  checklistItem: ChecklistItem.properties.type.const,
  hints: Hints.properties.type.const,
  hintsItem: HintsItem.properties.type.const,
  tour: Tour.properties.type.const,
  tourItem: TourItem.properties.type.const,
} as const;

export const BlockTypes = Type.Union([
  Entry.properties.type,
  BooleanType.properties.type,
  Model.properties.type,
  Finish.properties.type,
  Webhook.properties.type,
  FlowTrigger.properties.type,
  Gate.properties.type,
  Card.properties.type,
  Modal.properties.type,
  ContainerStart.properties.type,
  ContainerEnd.properties.type,
  Checklist.properties.type,
  ChecklistItem.properties.type,
  Hints.properties.type,
  HintsItem.properties.type,
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
    Type.Ref(FlowTrigger),
    Type.Ref(Gate),
    Type.Ref(Card),
    Type.Ref(Modal),
    Type.Ref(ContainerStart),
    Type.Ref(ContainerEnd),
    Type.Ref(Checklist),
    Type.Ref(ChecklistItem),
    Type.Ref(Hints),
    Type.Ref(HintsItem),
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
  | FlowTrigger
  | Gate
  | Card
  | Modal
  | ContainerStart
  | ContainerEnd
  | Checklist
  | ChecklistItem
  | Hints
  | HintsItem
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
    type === BLOCK_TYPES.hints ||
    type === BLOCK_TYPES.hintsItem ||
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
  | Hints
  | HintsItem
  | Tour
  | TourItem;

function getDefaultTransition(props: { transitioned: Nary['transitioned'] }): {
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

export function getDefaultBlock(props: {
  type: BlockTypes;
  version: Nary['version'];
  uid: Nary['uid'];
  sid: Nary['sid'];
  state: Nary['state'];
  transitioned: Nary['transitioned'];
  containerUid: Nary['containerUid'];
}): Block {
  const { type, transitioned } = props;

  switch (type) {
    case 'model':
      return {
        ...props,
        type: 'model',
        kind: 'block',
        fields: [],
      };
    case 'webhook':
      return {
        ...props,
        type: 'webhook',
        kind: 'block',
        transitioned: getDefaultTransition({ transitioned }),
        request: async () => ({
          ok: true,
          redirected: false,
          status: 204,
          statusText: '',
          url: '',
        }),
      };
    case 'flowTrigger':
      return {
        ...props,
        type: 'flowTrigger',
        kind: 'block',
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
        transitioned: getDefaultTransition({ transitioned }),
        expression: async () => false,
      };
    case 'finish':
      return {
        ...props,
        type: 'finish',
        kind: 'block',
        transitioned: {},
      };
    case 'gate':
      return {
        ...props,
        type: 'gate',
        kind: 'block',
        transitioned: getDefaultTransition({ transitioned }),
      };
    case 'boolean':
      return {
        ...props,
        type: 'boolean',
        kind: 'block',
        transitioned: {
          ...{ true: false, false: false },
          ...transitioned,
        },
        expression: async () => false,
      };
    case 'card':
      return {
        ...props,
        type: 'card',
        kind: 'block',
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        fields: [],
      };
    case 'modal':
      return {
        ...props,
        type: 'modal',
        kind: 'block',
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        fields: [],
      };
    case 'checklist':
      return {
        ...props,
        type: 'checklist',
        kind: 'block',
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        fields: [],
      };
    case 'checklistItem':
      return {
        ...props,
        type: 'checklistItem',
        kind: 'block',
        transitioned: {
          ...{ complete: false, skip: false },
          ...transitioned,
        },
        containerUid: getContainerUid(props),
        fields: [],
      };
    case 'hints':
      return {
        ...props,
        type: 'hints',
        kind: 'block',
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        fields: [],
      };
    case 'hintsItem':
      return {
        ...props,
        type: 'hintsItem',
        kind: 'block',
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        containerUid: getContainerUid(props),
        fields: [],
      };
    case 'tour':
      return {
        ...props,
        type: 'tour',
        kind: 'block',
        transitioned: {
          ...{ complete: false, dismiss: false },
          ...transitioned,
        },
        fields: [],
      };
    case 'tourItem':
      return {
        ...props,
        type: 'tourItem',
        kind: 'block',
        transitioned: {
          ...{ next: false, previous: false },
          ...transitioned,
        },
        containerUid: getContainerUid(props),
        fields: [],
      };
    case 'containerEnd':
      return {
        ...props,
        type: 'containerEnd',
        kind: 'block',
        transitioned: {},
        containerUid: getContainerUid(props),
      };
    case 'containerStart':
      return {
        ...props,
        type: 'containerStart',
        kind: 'block',
        transitioned: getDefaultTransition({ transitioned }),
        containerUid: getContainerUid(props),
      };
  }
}
