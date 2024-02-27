import { Static, Type } from '@sinclair/typebox';

import {
  DocumentContext,
  VisualContext,
  SemanticContext,
  ElementContext,
} from '../context';

export const UserIdentifierParams = Type.Object({
  userIdentifier: Type.String(),
  groupIdentifier: Type.Optional(Type.String()),
});

export type UserIdentifierParams = Static<typeof UserIdentifierParams>;

export const AssistantQueryParams = Type.Object({
  ...UserIdentifierParams.properties,
  model: Type.Optional(
    Type.Union([Type.Literal('gemini'), Type.Literal('gpt')])
  ),
});
export type AssistantQueryParams = Static<typeof AssistantQueryParams>;

export const AssistantRequestParams = Type.Object({
  sid: Type.String(),
});
export type AssistantRequestParams = Static<typeof AssistantRequestParams>;

export const AssistantRequestBody = Type.Object({
  query: Type.Optional(Type.String()),
  context: Type.Optional(
    Type.Object({
      document: Type.Optional(DocumentContext),
      visual: Type.Optional(VisualContext),
      element: Type.Optional(ElementContext),
      semantic: Type.Optional(SemanticContext),
    })
  ),
});

export type AssistantRequestBody = Static<typeof AssistantRequestBody>;

export const AssistantCompletionsRequestBody = AssistantRequestBody;

export type AssistantCompletionsRequestBody = Static<
  typeof AssistantCompletionsRequestBody
>;

export const AssistantSearchRequestBody = AssistantRequestBody;

export type AssistantSearchRequestBody = Static<
  typeof AssistantSearchRequestBody
>;

export const AssistantDocumentSources = Type.Array(
  Type.Object({
    id: Type.Number(),
    title: Type.String(),
    url: Type.String(),
    chunks: Type.Array(
      Type.Object({
        chunkId: Type.Number(),
        text: Type.String(),
        score: Type.Number(),
      })
    ),
  })
);
export type AssistantDocumentSources = Static<typeof AssistantDocumentSources>;

export const AssistantSearchResponse = AssistantDocumentSources;
export type AssistantSearchResponse = Static<typeof AssistantSearchResponse>;

export const AssistantCompletionsResponse = Type.Object({
  answer: Type.String(),
  sources: AssistantDocumentSources,
});

export type AssistantCompletionsResponse = Static<
  typeof AssistantCompletionsResponse
>;
