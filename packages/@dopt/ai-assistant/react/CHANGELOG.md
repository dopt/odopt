# @dopt/ai-assistant-react

## 0.0.12

### Patch Changes

- 87e55c3a0: fixes error management by adding client-side error handlers; exposes these handlers in both `@dopt/react-contextual-assistant` and `@dopt/ai-assistant-react`; allows users to configure default error messages via an `errorMessages` property
- Updated dependencies [87e55c3a0]
  - @dopt/ai-assistant-definition@0.0.7
  - @dopt/ai-assistant-javascript@0.0.12
  - @dopt/ai-assistant-context@0.0.9

## 0.0.11

### Patch Changes

- 077f32d1a: Fix misspellings in docs.
- Updated dependencies [955c75560]
  - @dopt/ai-assistant-javascript@0.0.11

## 0.0.10

### Patch Changes

- 538edaa80: Across `ai.dopt.com` and our SDKs, we now support using a `query` parameter which will be passed in as an input to our backend LLM models both for search and retrieval and for generative answers. We also remove support for (read: ignore) the `model` parameter -- specified values will just be ignored. We may expose this parameter in the future. Finally, we clean up context generation to truly make element, document, and visual contexts optional. In an upcoming change, we will add question-answer functionality to `@dopt/react-contextual-assistant`.
- Updated dependencies [538edaa80]
  - @dopt/ai-assistant-definition@0.0.6
  - @dopt/ai-assistant-javascript@0.0.10
  - @dopt/ai-assistant-context@0.0.8

## 0.0.9

### Patch Changes

- Updated dependencies [58dcf5165]
- Updated dependencies [afe048d2e]
  - @dopt/ai-assistant-context@0.0.7
  - @dopt/ai-assistant-definition@0.0.5
  - @dopt/ai-assistant-javascript@0.0.9

## 0.0.8

### Patch Changes

- b5245658b: Fix incorrect tag and minor formatting issues in documented code examples
- c52328d20: Adds the ability to toggle between `GPT` and `Gemini` models for answer summarization. This feature is still being alpha tested and the default is `Gemini`.
- Updated dependencies [c52328d20]
  - @dopt/ai-assistant-definition@0.0.4
  - @dopt/ai-assistant-javascript@0.0.8
  - @dopt/ai-assistant-context@0.0.6

## 0.0.7

### Patch Changes

- 38b30dc58: This change simplifies streaming and non-streaming completions from `ai.dopt.com` and better handles errors by providing sensible default. In the future, these defaults will also be configurable. This change also eliminates a few status types that were redundant with returned values (`summarizing` and `citing`). Finally, this change eliminates the `DocumentsChunk` which was previously streamed before the `ContentChunk` and the `AnswerChunk`. From our early usage and from feedback with alpha users, we've found that we can retrieve documents much more reliably after content and answer are ready, so we've removed the early `DocumentsChunk` which often contained a few irrelevant objects. The exposed hooks and accessors in our SDKs remain the same but our components should be easier to use with less conditionality.
- Updated dependencies [38b30dc58]
  - @dopt/ai-assistant-definition@0.0.3
  - @dopt/ai-assistant-context@0.0.5
  - @dopt/ai-assistant-javascript@0.0.7

## 0.0.6

### Patch Changes

- Updated dependencies [780a2cf9d]
  - @dopt/ai-assistant-context@0.0.4
  - @dopt/ai-assistant-javascript@0.0.6

## 0.0.5

### Patch Changes

- Updated dependencies [910cb4815]
- Updated dependencies [930f4476c]
  - @dopt/ai-assistant-context@0.0.3
  - @dopt/ai-assistant-javascript@0.0.5

## 0.0.4

### Patch Changes

- @dopt/ai-assistant-javascript@0.0.4

## 0.0.3

### Patch Changes

- @dopt/ai-assistant-javascript@0.0.3

## 0.0.2

### Patch Changes

- 0dd1ec27e: Create a changeset to capture work in @dopt/ai-assistant-\*.
- Updated dependencies [0dd1ec27e]
  - @dopt/ai-assistant-context@0.0.2
  - @dopt/ai-assistant-definition@0.0.2
  - @dopt/ai-assistant-javascript@0.0.2

## 0.0.1

### Patch Changes

- b992af681: Begin versioning/publishing the AI packages.
- Updated dependencies [b992af681]
  - @dopt/ai-assistant-definition@0.0.1
  - @dopt/ai-assistant-javascript@0.0.1
  - @dopt/ai-assistant-context@0.0.1
