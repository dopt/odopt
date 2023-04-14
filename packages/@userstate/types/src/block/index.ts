import { Type, Static } from '@sinclair/typebox';
import { Finish } from './finish';
import { Entry } from './entry';
import { Gate } from './gate';

import { Boolean as BooleanType } from './boolean';
import { Model } from './model';
import { Set } from './set';
import { Element } from './element';
import { Webhook } from './webhook';
import { Nary } from './base';

export * from './entry';
export * from './finish';
export * from './boolean';
export * from './model';
export * from './set';
export * from './element';
export * from './webhook';
export * from './gate';

export const BLOCK_TYPES = {
  entry: Entry.properties.type.const,
  boolean: BooleanType.properties.type.const,
  model: Model.properties.type.const,
  finish: Finish.properties.type.const,
  set: Set.properties.type.const,
  element: Element.properties.type.const,
  webhook: Webhook.properties.type.const,
  gate: Gate.properties.type.const,
} as const;

export const BlockTypes = Type.Union([
  Entry.properties.type,
  BooleanType.properties.type,
  Model.properties.type,
  Finish.properties.type,
  Set.properties.type,
  Element.properties.type,
  Webhook.properties.type,
  Gate.properties.type,
]);
export type BlockTypes = Static<typeof BlockTypes>;

export const Block = Type.Union(
  [
    Type.Ref(Model),
    Type.Ref(Entry),
    Type.Ref(BooleanType),
    Type.Ref(Finish),
    Type.Ref(Set),
    Type.Ref(Element),
    Type.Ref(Webhook),
    Type.Ref(Gate),
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
 *
 * Group (`set`) blocks also have:
 * - `blocks`, `size`, and `ordered` values.
 *
 * Only `model` and `set` blocks are exposed to client-side SDKs.
 */
export type Block =
  | Finish
  | Entry
  | BooleanType
  | Model
  | Set
  | Element
  | Webhook
  | Gate;

export const Blocks = Type.Array(Type.Ref(Block));
export type Blocks = Static<typeof Blocks>;
export const SET_ELEMENTS: [BlockTypes] = [Model.properties.type.const];

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

// TODO JM - the type should *not* be string but unforunately we
// duplicate block type as an enum in prisma, binding the
// related, but ideally independent, implementations together
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
    case 'element':
      return {
        kind: 'block',
        fields: [],
        transitioned: getDefaultTransition({ transitioned }),
        state: defaultState,
        ...props,
        type: 'model',
      };
    case 'set':
      return {
        ...props,
        type: 'set',
        kind: 'block',
        size: 0,
        blocks: [],
        state: defaultState,
        transitioned: getDefaultTransition({ transitioned }),
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
    default:
      throw new Error(`Factory not implemented for ${props.type}`);
  }
}
