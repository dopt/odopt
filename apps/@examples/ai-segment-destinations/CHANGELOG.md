# @examples/ai-segment-destinations

## 0.0.3

### Patch Changes

- Updated dependencies [c97f4e881]
  - @dopt/react-contextual-assistant@0.0.9

## 0.0.2

### Patch Changes

- 38b30dc58: This change simplifies streaming and non-streaming completions from `ai.dopt.com` and better handles errors by providing sensible default. In the future, these defaults will also be configurable. This change also eliminates a few status types that were redundant with returned values (`summarizing` and `citing`). Finally, this change eliminates the `DocumentsChunk` which was previously streamed before the `ContentChunk` and the `AnswerChunk`. From our early usage and from feedback with alpha users, we've found that we can retrieve documents much more reliably after content and answer are ready, so we've removed the early `DocumentsChunk` which often contained a few irrelevant objects. The exposed hooks and accessors in our SDKs remain the same but our components should be easier to use with less conditionality.
- Updated dependencies [ef850c969]
- Updated dependencies [c0a10bd5b]
- Updated dependencies [38b30dc58]
- Updated dependencies [c960b3001]
  - @dopt/react-contextual-assistant@0.0.8
  - @dopt/ai-assistant-react@0.0.7
  - @dopt/react-theme@1.2.2
