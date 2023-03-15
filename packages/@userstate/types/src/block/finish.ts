import { Static, Type } from '@sinclair/typebox';
import { Empty } from './base';

export const Finish = Type.Object(
  {
    ...Empty.properties,
    type: Type.Literal('finish'),
  },
  { $id: 'Finish' }
);
export type Finish = Static<typeof Finish>;
