import { Static, Type } from '@sinclair/typebox';
import { Base } from './base';

export const WebhookTypeConst = 'webhook';
export const WebhookType = Type.Literal(WebhookTypeConst);
export const WebhookProps = Type.Object(
  {
    type: Type.Readonly(WebhookType),
    method: Type.String(),
    url: Type.String(),
    headers: Type.Record(Type.String(), Type.String()),
    body: Type.Object({}, { additionalProperties: true }),
  },
  { $id: 'WebhookProps' }
);

export const Webhook = Type.Intersect([Base, WebhookProps], { $id: 'Webhook' });
export type Webhook = Static<typeof Webhook>;
