import { Static, Type } from '@sinclair/typebox';
import { Unary } from './base';

export const Webhook = Type.Object(
  {
    ...Unary.properties,
    type: Type.Literal('webhook'),
    request: Type.Function(
      [],
      Type.Promise(
        Type.Object({
          ok: Type.Boolean(),
          redirected: Type.Boolean(),
          status: Type.Number(),
          statusText: Type.String(),
          url: Type.String(),
        })
      )
    ),
  },
  { $id: 'Webhook' }
);
export type Webhook = Static<typeof Webhook>;
