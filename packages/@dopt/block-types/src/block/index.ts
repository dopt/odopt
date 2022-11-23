//import { Element } from './element';
import { Type, Static } from '@sinclair/typebox';
import { EndProps } from './end';
import { EntryProps } from './entry';
import { ModelProps } from './model';
//import { Set } from './set';

export type BlockTypeMap = {
  //element: Element;
  end: End;
  entry: Entry;
  model: Model;
  //set: Set;
};

export type BlockTypeKeys = keyof BlockTypeMap;
export type BlockType = BlockTypeMap[BlockTypeKeys];

const Base = Type.Object({
  kind: Type.Readonly(Type.Literal('block')),
  uid: Type.Readonly(Type.String()),
  sid: Type.Readonly(Type.String()),
  version: Type.Readonly(Type.Number()),
  state: Type.Readonly(
    Type.Object({
      active: Type.Boolean(),
      completed: Type.Boolean(),
    })
  ),
});

export const End = Type.Intersect([Base, EndProps]);
export type End = Static<typeof End>;

export const Entry = Type.Intersect([Base, EntryProps]);
export type Entry = Static<typeof Entry>;

export const Model = Type.Intersect([Base, ModelProps]);
export type Model = Static<typeof Model>;

export const Block = Type.Union([Model, Entry, End]);
export type Block = Static<typeof Block>;

export const Blocks = Type.Array(Block);
export type Blocks = Static<typeof Blocks>;
