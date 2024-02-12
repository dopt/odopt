import { Static, Type } from '@sinclair/typebox';

export const StatusChunk = Type.Object({
  type: Type.Literal('status'),
  status: Type.Union([
    Type.Literal('searching'),
    Type.Literal('summarizing'),
    Type.Literal('answering'),
    Type.Literal('citing'),
  ]),
});

export type StatusChunk = Static<typeof StatusChunk>;

export const DocumentsChunk = Type.Object({
  type: Type.Literal('documents'),
  sources: Type.Array(
    Type.Object({
      url: Type.String(),
      title: Type.String(),
      id: Type.Number(),
    })
  ),
});

export type DocumentsChunk = Static<typeof DocumentsChunk>;

export const ContentStreamChunk = Type.Object({
  type: Type.Literal('content'),
  content: Type.String(),
});

export type ContentStreamChunk = Static<typeof ContentStreamChunk>;

export const AnswerChunk = Type.Object({
  type: Type.Literal('answer'),
  answer: Type.String(),
  citations: Type.Array(
    Type.Object({
      id: Type.Number(),
    })
  ),
});

export type AnswerChunk = Static<typeof AnswerChunk>;

export const ChatStreamChunk = Type.Union([
  StatusChunk,
  DocumentsChunk,
  ContentStreamChunk,
  AnswerChunk,
]);

export type ChatStreamChunk = Static<typeof ChatStreamChunk>;
