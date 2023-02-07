import { Type, Static } from '@sinclair/typebox';
import { Finish, FinishType, FinishTypeConst } from './finish';
import { Entry, EntryType, EntryTypeConst } from './entry';
import { Model, ModelType, ModelTypeConst } from './model';
import { Set, SetType, SetTypeConst } from './set';
import { Webhook, WebhookType, WebhookTypeConst } from './webhook';
import { BaseType } from './base';

export * from './entry';
export * from './finish';
export * from './model';
export * from './set';
export * from './webhook';

export { BlockState, Base as BaseBlock } from './base';
export type { BaseType as BaseBlockType } from './base';

export const BLOCK_TYPES = {
  entry: EntryTypeConst,
  model: ModelTypeConst,
  finish: FinishTypeConst,
  set: SetTypeConst,
  webhook: WebhookTypeConst,
} as const;

export const BlockTypes = Type.Union([
  EntryType,
  ModelType,
  FinishType,
  SetType,
  WebhookType,
]);
export type BlockTypes = Static<typeof BlockTypes>;

export const Block = Type.Union([Model, Entry, Finish, Set, Webhook]);
export type Block = Static<typeof Block>;

// Currently this is only element but has the possibility to expand later
export const Element = Type.Union([Model]);
export type Element = Static<typeof Element>;

export const Blocks = Type.Array(Block);
export type Blocks = Static<typeof Blocks>;

export const SET_ELEMENTS: [BlockTypes] = [ModelTypeConst];

export function getDefaultBlock({
  uid,
  type,
  version,
  active,
  completed,
}: {
  uid: string;
  type: BlockTypes;
  version?: number;
  active?: boolean;
  completed?: boolean;
}): Block {
  const base: BaseType = {
    kind: 'block',
    uid,
    sid: uid,
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
    case WebhookTypeConst:
      return {
        ...base,
        type: WebhookTypeConst,
        method: '',
        url: '',
        headers: {},
        body: {},
      };
    default:
      return { ...base, type };
  }
}
