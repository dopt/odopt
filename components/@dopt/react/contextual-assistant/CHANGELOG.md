# @dopt/react-contextual-assistant

## 0.0.9

### Patch Changes

- c97f4e881: set correct citation link styles

## 0.0.8

### Patch Changes

- ef850c969: tune overlay transition
- c0a10bd5b: bind esc to cancel highlight mode
- 38b30dc58: This change simplifies streaming and non-streaming completions from `ai.dopt.com` and better handles errors by providing sensible default. In the future, these defaults will also be configurable. This change also eliminates a few status types that were redundant with returned values (`summarizing` and `citing`). Finally, this change eliminates the `DocumentsChunk` which was previously streamed before the `ContentChunk` and the `AnswerChunk`. From our early usage and from feedback with alpha users, we've found that we can retrieve documents much more reliably after content and answer are ready, so we've removed the early `DocumentsChunk` which often contained a few irrelevant objects. The exposed hooks and accessors in our SDKs remain the same but our components should be easier to use with less conditionality.
- c960b3001: Update the positioning logic for the highlight.
- Updated dependencies [38b30dc58]
  - @dopt/ai-assistant-definition@0.0.3
  - @dopt/ai-assistant-react@0.0.7
  - @dopt/ai-assistant-javascript@0.0.7
  - @dopt/react-theme@1.2.2

## 0.0.7

### Patch Changes

- dfee879a6: add styling for answer markdown elements
  - @dopt/ai-assistant-javascript@0.0.6
  - @dopt/ai-assistant-react@0.0.6

## 0.0.6

### Patch Changes

- cf5646e5d: open source links in new window
- 362b280d6: Each contextual assissistant is bound to a single assistant in Dopt.
- Updated dependencies [930f4476c]
  - @dopt/ai-assistant-javascript@0.0.5
  - @dopt/ai-assistant-react@0.0.5

## 0.0.5

### Patch Changes

- @dopt/ai-assistant-javascript@0.0.4
- @dopt/ai-assistant-react@0.0.4

## 0.0.4

### Patch Changes

- @dopt/ai-assistant-javascript@0.0.3
- @dopt/ai-assistant-react@0.0.3

## 0.0.3

### Patch Changes

- Updated dependencies [0dd1ec27e]
  - @dopt/ai-assistant-definition@0.0.2
  - @dopt/ai-assistant-javascript@0.0.2
  - @dopt/ai-assistant-react@0.0.2

## 0.0.2

### Patch Changes

- 8ac58e0e8: Clear document state across requests. Ensure clicks for AI assist do not propagate.

## 0.0.1

### Patch Changes

- b992af681: Begin versioning/publishing the AI packages.
- Updated dependencies [b992af681]
  - @dopt/ai-assistant-definition@0.0.1
  - @dopt/ai-assistant-javascript@0.0.1
  - @dopt/ai-assistant-react@0.0.1
