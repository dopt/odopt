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
});
export type AssistantQueryParams = Static<typeof AssistantQueryParams>;

export const AssistantRequestParams = Type.Object({
  sid: Type.String(),
});
export type AssistantRequestParams = Static<typeof AssistantRequestParams>;

export const AssistantCompletionsRequestBody = Type.Object({
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

export type AssistantCompletionsRequestBody = Static<
  typeof AssistantCompletionsRequestBody
>;

export const AssistantSearchRequestBody = AssistantCompletionsRequestBody;

export type AssistantSearchRequestBody = Static<
  typeof AssistantSearchRequestBody
>;

export const AssistantSearchResponse = Type.Array(
  Type.Object({
    documentId: Type.Number(),
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

export type AssistantSearchResponse = Static<typeof AssistantSearchResponse>;

export const AssistantCompletionsResponse = Type.Object({
  documents: AssistantSearchResponse,
  answer: Type.String(),
  citations: Type.Array(
    Type.Object({
      id: Type.Number(),
    })
  ),
});

export type AssistantCompletionsResponse = Static<
  typeof AssistantCompletionsResponse
>;
