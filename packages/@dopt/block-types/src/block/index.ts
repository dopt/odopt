import { Type, Static } from '@sinclair/typebox';
import { Finish, FinishType, FinishTypeConst } from './finish';
import { Entry, EntryType, EntryTypeConst } from './entry';
import { Boolean, BooleanType, BooleanTypeConst } from './boolean';
import { Model, ModelType, ModelTypeConst } from './model';
import { Set, SetType, SetTypeConst } from './set';
import { Webhook, WebhookType, WebhookTypeConst } from './webhook';
import { BaseType } from './base';
import { Gate, GateType, GateTypeConst } from './gate';

export * from './entry';
export * from './finish';
export * from './boolean';
export * from './model';
export * from './set';
export * from './webhook';

export { BlockState, Base as BaseBlock } from './base';

export const BLOCK_TYPES = {
  entry: EntryTypeConst,
  boolean: BooleanTypeConst,
  model: ModelTypeConst,
  finish: FinishTypeConst,
  set: SetTypeConst,
  webhook: WebhookTypeConst,
  gate: GateTypeConst,
} as const;

export const BlockTypes = Type.Union([
  EntryType,
  BooleanType,
  ModelType,
  FinishType,
  SetType,
  WebhookType,
  GateType,
]);
export type BlockTypes = Static<typeof BlockTypes>;

export const Block = Type.Union(
  [
    Type.Ref(Model),
    Type.Ref(Entry),
    Type.Ref(Boolean),
    Type.Ref(Finish),
    Type.Ref(Set),
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
export type Block = Static<typeof Block>;

/**
 * This variable is a wrapper type for a step (`model`) block.
 * This wrapper defines all possible children of group (`set`) blocks.
 * Currently, only step blocks can be contained within group blocks.
 */
export const Element = Type.Union([Type.Ref(Model)]);

/**
 * This type is a wrapper type for a step (`model`) block.
 * This wrapper defines all possible children of group (`set`) blocks.
 * Currently, only step blocks can be contained within group blocks.
 */
export type Element = Static<typeof Element>;

export const Blocks = Type.Array(Type.Ref(Block));
export type Blocks = Static<typeof Blocks>;

export const SET_ELEMENTS: [BlockTypes] = [ModelTypeConst];

export function getDefaultBlock({
  uid,
  type,
  version,
  active,
  completed,
  sid,
}: {
  uid: string;
  type: BlockTypes;
  version?: number;
  active?: boolean;
  completed?: boolean;
  sid: string;
}): Block {
  const base: BaseType = {
    kind: 'block',
    uid,
    sid,
    version: version != null ? version : -1,
    state: {
      active: active != null ? active : false,
      completed: completed != null ? completed : false,
    },
  };

  switch (type) {
    case ModelTypeConst:
      return { ...base, type: ModelTypeConst, fields: [] };
    case SetTypeConst:
      return { ...base, type: SetTypeConst, size: 0, blocks: [] };
    case BooleanTypeConst:
      return { ...base, type: BooleanTypeConst, expression: async () => true };
    case WebhookTypeConst:
      return {
        ...base,
        type: WebhookTypeConst,
        request: async () => ({
          ok: true,
          redirected: false,
          status: 204,
          statusText: '',
          url: '',
        }),
      };
    default:
      return { ...base, type };
  }
}
