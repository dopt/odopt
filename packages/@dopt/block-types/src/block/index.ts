import { Element } from './element';
import { End } from './end';
import { Entry } from './entry';
import { Model } from './model';
import { Set } from './set';

//export * from './block';
export * from './element';
export * from './end';
export * from './entry';
export * from './model';
export * from './set';

export type BlockTypeMap = {
  element: Element;
  end: End;
  entry: Entry;
  model: Model;
  set: Set;
};

export type BlockTypeKeys = keyof BlockTypeMap;
export type BlockType = BlockTypeMap[BlockTypeKeys];

export interface Block<T extends BlockTypeKeys> {
  readonly kind: 'block';
  readonly type: T;
  readonly uuid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    active: boolean;
    started: boolean;
    completed: boolean;
  };
}
