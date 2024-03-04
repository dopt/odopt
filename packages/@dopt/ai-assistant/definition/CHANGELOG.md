# @dopt/ai-assistant-definition

## 0.0.7

### Patch Changes

- 87e55c3a0: fixes error management by adding client-side error handlers; exposes these handlers in both `@dopt/react-contextual-assistant` and `@dopt/ai-assistant-react`; allows users to configure default error messages via an `errorMessages` property

## 0.0.6

### Patch Changes

- 538edaa80: Across `ai.dopt.com` and our SDKs, we now support using a `query` parameter which will be passed in as an input to our backend LLM models both for search and retrieval and for generative answers. We also remove support for (read: ignore) the `model` parameter -- specified values will just be ignored. We may expose this parameter in the future. Finally, we clean up context generation to truly make element, document, and visual contexts optional. In an upcoming change, we will add question-answer functionality to `@dopt/react-contextual-assistant`.

## 0.0.5

### Patch Changes

- afe048d2e: Adds `query`, `setQuery` to assistant context provider and hook

## 0.0.4

### Patch Changes

- c52328d20: Adds the ability to toggle between `GPT` and `Gemini` models for answer summarization. This feature is still being alpha tested and the default is `Gemini`.

## 0.0.3

### Patch Changes

- 38b30dc58: This change simplifies streaming and non-streaming completions from `ai.dopt.com` and better handles errors by providing sensible default. In the future, these defaults will also be configurable. This change also eliminates a few status types that were redundant with returned values (`summarizing` and `citing`). Finally, this change eliminates the `DocumentsChunk` which was previously streamed before the `ContentChunk` and the `AnswerChunk`. From our early usage and from feedback with alpha users, we've found that we can retrieve documents much more reliably after content and answer are ready, so we've removed the early `DocumentsChunk` which often contained a few irrelevant objects. The exposed hooks and accessors in our SDKs remain the same but our components should be easier to use with less conditionality.

## 0.0.2

### Patch Changes

- 0dd1ec27e: Create a changeset to capture work in @dopt/ai-assistant-\*.

## 0.0.1

### Patch Changes

- b992af681: Begin versioning/publishing the AI packages.
