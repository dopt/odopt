import {
  Model as UserStateTypeModel,
  Flow as UserStateTypeFlow,
  Fields as UserStateTypeFields,
} from '@userstate/types';
import { Type, Static } from '@sinclair/typebox';

export const Model = UserStateTypeModel;
export type Model = Static<typeof Model>;

export const Fields = UserStateTypeFields;
export type Fields = UserStateTypeFields;

export const Block = Model;
export type Block = Model;

export const Flow = Type.Object(
  {
    ...UserStateTypeFlow.properties,
    blocks: Type.Optional(Type.Array(Block)),
  },
  { $id: 'Flow' }
);
export type Flow = Static<typeof Flow>;

export const BLOCK_TYPES = {
  model: Model.properties.type.const,
} as const;

export function convert(block: UserStateTypeModel): Block {
  return block;
}
