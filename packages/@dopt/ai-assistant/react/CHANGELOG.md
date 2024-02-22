# @dopt/ai-assistant-react

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
