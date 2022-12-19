import { Type, Static } from '@sinclair/typebox';
import { Finish } from './finish';
import { Entry } from './entry';
import { Model } from './model';

export * from './entry';
export * from './finish';
export * from './model';
export { BlockState } from './base';
export type BlockTypes = Finish['type'] | Entry['type'] | Model['type'];

export const Block = Type.Union([Model, Entry, Finish]);
export type Block = Static<typeof Block>;

export const Blocks = Type.Array(Block);
export type Blocks = Static<typeof Blocks>;
