import { Static, Type } from '@sinclair/typebox';

const Context = Type.Object({
  type: Type.Union([
    Type.Literal('document'),
    Type.Literal('element'),
    Type.Literal('user'),
    Type.Literal('visual'),
    Type.Literal('semantic'),
    Type.Literal('runtime'),
  ]),
});
export type Context = Static<typeof Context>;

export const DocumentContext = Type.Object({
  type: Type.Literal('document'),
  value: Type.Object({
    hostname: Type.String(),
    path: Type.String(),
    title: Type.String(),
    width: Type.Number(),
    height: Type.Number(),
  }),
});

export type DocumentContext = Static<typeof DocumentContext>;

export const ElementContext = Type.Object({
  type: Type.Literal('element'),
  value: Type.Object({
    position: Type.Object({
      top: Type.Number(),
      left: Type.Number(),
    }),
    content: Type.String(),
  }),
});

export type ElementContext = Static<typeof ElementContext>;

export const UserContext = Type.Object({
  type: Type.Literal('user'),
  value: Type.Object({}),
});

export type UserContext = Static<typeof UserContext>;

export const VisualContext = Type.Object({
  type: Type.Literal('visual'),
  value: Type.String(),
});

export type VisualContext = Static<typeof VisualContext>;

export const SemanticContext = Type.Object({
  type: Type.Literal('semantic'),
  value: Type.Object({
    semanticContent: Type.String(),
    neighboringSemanticContent: Type.String(),
  }),
});

export type SemanticContext = Static<typeof SemanticContext>;

export const RuntimeContext = Type.Object({
  type: Type.Literal('runtime'),
  value: Type.Object({
    sid: Type.String(),
    context: Type.Union([Type.Number(), Type.Boolean(), Type.String()]),
  }),
});

export type RuntimeContext = Static<typeof RuntimeContext>;
