import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';

export const Webhook = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('webhook'),
    request: Type.Function([], Type.Unknown()),
  },
  { $id: 'Webhook' }
);
export type Webhook = Static<typeof Webhook>;
