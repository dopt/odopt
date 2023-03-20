import type {
  Model as UserStateTypeModel,
  Flow as UserStateTypeFlow,
  Fields as UserStateTypeFields,
} from '@userstate/types';

export type Flow = Omit<UserStateTypeFlow, 'blocks'>;
export type Model = Omit<UserStateTypeModel, 'fields'>;

export type Fields = UserStateTypeFields;

export type Block = Model;

export function convert(block: UserStateTypeModel): Block {
  return block;
}
