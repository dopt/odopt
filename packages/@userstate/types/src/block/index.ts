import { Type, Static } from '@sinclair/typebox';
import { Finish } from './finish';
import { Entry } from './entry';
import { Gate } from './gate';

import { Boolean as BooleanType } from './boolean';
import { Model } from './model';
import { Modal } from './modal';
import { Webhook } from './webhook';
import { Nary } from './base';

export * from './entry';
export * from './finish';
export * from './boolean';
export * from './model';
export * from './modal';
export * from './webhook';
export * from './gate';

export const BLOCK_TYPES = {
  entry: Entry.properties.type.const,
  boolean: BooleanType.properties.type.const,
  model: Model.properties.type.const,
  finish: Finish.properties.type.const,
  webhook: Webhook.properties.type.const,
  gate: Gate.properties.type.const,
  modal: Modal.properties.type.const,
} as const;

export const BlockTypes = Type.Union([
  Entry.properties.type,
  BooleanType.properties.type,
  Model.properties.type,
  Finish.properties.type,
  Webhook.properties.type,
  Gate.properties.type,
  Modal.properties.type,
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
    Type.Ref(Modal),
  ],
  { $id: 'Block' }
);

/**
 * This union type encapsulates all allowed block types.
 * In general, blocks have:
 * - `state`: whether the block is active or completed
 * - `uid`: the identifier for the block
 *
 * Step (`model`) blocks also have:
 * - `fields`: an array of Field values
 */
export type Block =
  | Finish
  | Entry
  | BooleanType
  | Model
  | Webhook
  | Gate
  | Modal;

export const Blocks = Type.Array(Type.Ref(Block));
export type Blocks = Static<typeof Blocks>;

export function isExternalBlock(type: BlockTypes) {
  return type === BLOCK_TYPES.model || type === BLOCK_TYPES.modal;
}

export type ExternalBlock = Model | Modal;

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

export function getDefaultBlock(
  props: Partial<Omit<Nary, 'kind'>> & { type: BlockTypes } & Pick<
      Nary,
      'version' | 'uid' | 'sid'
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
        transitioned: getDefaultTransition({ transitioned }),
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
    default:
      throw new Error(`Factory not implemented for ${props.type}`);
  }
}
