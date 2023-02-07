import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const EntryTypeConst = 'entry';
export const EntryType = Type.Literal(EntryTypeConst);
export const EntryProps = Type.Object(
  {
    type: Type.Readonly(EntryType),
    expression: Type.Optional(Type.Function([], Type.Promise(Type.Boolean()))),
  },
  { $id: 'EntryProps' }
);

export const Entry = Type.Intersect([Base, EntryProps], { $id: 'Entry' });
export type Entry = Static<typeof Entry>;
