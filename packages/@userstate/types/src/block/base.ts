import { ObjectOptions, Static, Type } from '@sinclair/typebox';

export const Base = Type.Object({
  kind: Type.Literal('block'),
  uid: Type.String(),
  sid: Type.String(),
  version: Type.Number(),
  state: Type.Object({
    active: Type.Boolean(),
    entered: Type.Boolean(),
    exited: Type.Boolean(),
  }),
  containerUid: Type.Optional(Type.String()),
});
export type Base = Static<typeof Base>;

export const Empty = Type.Object({
  ...Base.properties,
  transitioned: Type.Object({}),
});
export type Empty = Static<typeof Empty>;

export const Unary = Type.Object({
  ...Base.properties,
  transitioned: Type.Object({
    default: Type.Boolean(),
  }),
});
export type Unary = Static<typeof Unary>;

export const OptionallyUnary = Type.Object({
  ...Base.properties,
  transitioned: Type.Union([
    Type.Object({
      default: Type.Boolean(),
    }),
    Type.Object({}),
  ]),
});
export type OptionallyUnary = Static<typeof OptionallyUnary>;

export const Binary = Type.Object({
  ...Base.properties,
  transitioned: Type.Object({
    true: Type.Boolean(),
    false: Type.Boolean(),
  }),
});
export type Binary = Static<typeof Binary>;

export const Nary = Type.Object({
  ...Base.properties,
  transitioned: Type.Record(Type.String(), Type.Boolean()),
});
export type Nary = Static<typeof Nary>;

export const extend = (
  primitive: typeof Empty | typeof Unary | typeof Binary | typeof Nary,
  properties: Parameters<typeof Type.Object>[0],
  options: ObjectOptions
) =>
  Type.Object(
    {
      ...primitive.properties,
      ...properties,
    },
    options
  );
