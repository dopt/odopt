import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const WebhookTypeConst = 'webhook';
export const WebhookType = Type.Literal(WebhookTypeConst);
export const WebhookProps = Type.Object(
  {
    type: Type.Readonly(WebhookType),
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
  { $id: 'WebhookProps' }
);

export const Webhook = Type.Intersect([Base, WebhookProps], { $id: 'Webhook' });
export type Webhook = Static<typeof Webhook>;
