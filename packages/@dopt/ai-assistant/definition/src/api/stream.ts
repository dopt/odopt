import { Static, Type } from '@sinclair/typebox';
import { AssistantDocumentSources } from './completions';

export const StatusChunk = Type.Object({
  type: Type.Literal('status'),
  status: Type.Union([Type.Literal('searching'), Type.Literal('answering')]),
});

export type StatusChunk = Static<typeof StatusChunk>;

export const ContentStreamChunk = Type.Object({
  type: Type.Literal('content'),
  content: Type.String(),
});

export type ContentStreamChunk = Static<typeof ContentStreamChunk>;

export const AnswerChunk = Type.Object({
  type: Type.Literal('answer'),
  answer: Type.String(),
  sources: AssistantDocumentSources,
});

export type AnswerChunk = Static<typeof AnswerChunk>;

export const ChatStreamChunk = Type.Union([
  StatusChunk,
  ContentStreamChunk,
  AnswerChunk,
]);

export type ChatStreamChunk = Static<typeof ChatStreamChunk>;
