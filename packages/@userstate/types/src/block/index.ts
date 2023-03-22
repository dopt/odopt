import { Type, Static } from '@sinclair/typebox';
import { Finish } from './finish';
import { Entry } from './entry';
import { Boolean as BooleanType } from './boolean';
import { Model } from './model';
import { Set } from './set';
import { Element } from './element';
import { Webhook } from './webhook';

export * from './entry';
export * from './finish';
export * from './boolean';
export * from './model';
export * from './set';
export * from './element';
export * from './webhook';

export const BLOCK_TYPES = {
  entry: Entry.properties.type.const,
  boolean: BooleanType.properties.type.const,
  model: Model.properties.type.const,
  finish: Finish.properties.type.const,
  set: Set.properties.type.const,
  element: Element.properties.type.const,
  webhook: Webhook.properties.type.const,
} as const;

export const BlockTypes = Type.Union([
  Entry.properties.type,
  BooleanType.properties.type,
  Model.properties.type,
  Finish.properties.type,
  Set.properties.type,
  Element.properties.type,
  Webhook.properties.type,
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
  | Webhook;

export const Blocks = Type.Array(Type.Ref(Block));
export type Blocks = Static<typeof Blocks>;

export const SET_ELEMENTS: [BlockTypes] = [Model.properties.type.const];

import { Base } from './base';

// TODO JM - the type should *not* be string but unforunately we
// duplicate block type as an enum in prisma, binding the
// related, but ideally independent, implementations together
export function getDefaultBlock(props: Base & { type: string }): Block {
  switch (props.type) {
    case 'model':
    case 'element':
      return {
        ...props,
        type: 'model',
        fields: [],
        transitioned: {
          default: false,
        },
      };
    case 'set':
      return {
        ...props,
        type: 'set',
        size: 0,
        blocks: [],
        transitioned: {
          default: false,
        },
      };
    case 'webhook':
      return {
        ...props,
        type: 'webhook',
        request: async () => ({
          ok: true,
          redirected: false,
          status: 204,
          statusText: '',
          url: '',
        }),
        transitioned: {
          default: false,
        },
      };
    case 'entry':
      return {
        ...props,
        type: 'entry',
        expression: async () => false,
        transitioned: {
          default: false,
        },
      };
    case 'finish':
      return {
        ...props,
        type: 'finish',
        transitioned: {},
      };
    default:
      throw new Error(`Factory not implemented for ${props.type}`);
  }
}
