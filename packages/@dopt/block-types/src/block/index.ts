import { Type, Static } from '@sinclair/typebox';
import { End } from './end';
import { Entry } from './entry';
import { Model } from './model';

export * from './entry';
export * from './end';
export * from './model';
export { BlockState } from './base';
export type BlockTypes = End['type'] | Entry['type'] | Model['type'];

export const Block = Type.Union([Model, Entry, End]);
export type Block = Static<typeof Block>;

export const Blocks = Type.Array(Block);
export type Blocks = Static<typeof Blocks>;
