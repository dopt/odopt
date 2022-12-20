import { Type, Static } from '@sinclair/typebox';
import { Finish, FinishType, FinishTypeConst } from './finish';
import { Entry, EntryType, EntryTypeConst } from './entry';
import { Model, ModelType, ModelTypeConst } from './model';
import { Set, SetType, SetTypeConst } from './set';

export * from './entry';
export * from './finish';
export * from './model';
export * from './set';

export { BlockState } from './base';
export const BLOCK_TYPES = {
  entry: EntryTypeConst,
  model: ModelTypeConst,
  finish: FinishTypeConst,
  set: SetTypeConst,
} as const;

export const BlockTypes = Type.Union([
  EntryType,
  ModelType,
  FinishType,
  SetType,
]);
export type BlockTypes = Static<typeof BlockTypes>;

export const Block = Type.Union([Model, Entry, Finish, Set]);
export type Block = Static<typeof Block>;

export const Blocks = Type.Array(Block);
export type Blocks = Static<typeof Blocks>;
