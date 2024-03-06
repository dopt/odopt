# @examples/ai-segment-destinations

## 0.0.12

### Patch Changes

- Updated dependencies [11e3a7eb4]
- Updated dependencies [2b7e6af6b]
  - @dopt/react-contextual-assistant@0.0.17
  - @dopt/ai-assistant-react@0.0.13

## 0.0.11

### Patch Changes

- Updated dependencies [dec67720c]
  - @dopt/react@4.1.2
  - @dopt/react-contextual-assistant@0.0.16

## 0.0.10

### Patch Changes

- Updated dependencies [b39c05018]
  - @dopt/react-contextual-assistant@0.0.16

## 0.0.9

### Patch Changes

- Updated dependencies [87e55c3a0]
  - @dopt/react-contextual-assistant@0.0.15
  - @dopt/ai-assistant-react@0.0.12

## 0.0.8

### Patch Changes

- Updated dependencies [077f32d1a]
- Updated dependencies [955c75560]
  - @dopt/ai-assistant-react@0.0.11
  - @dopt/react-contextual-assistant@0.0.14

## 0.0.7

### Patch Changes

- Updated dependencies [538edaa80]
  - @dopt/react-contextual-assistant@0.0.13
  - @dopt/ai-assistant-react@0.0.10

## 0.0.6

### Patch Changes

- Updated dependencies [afe048d2e]
  - @dopt/react-contextual-assistant@0.0.12
  - @dopt/ai-assistant-react@0.0.9

## 0.0.5

### Patch Changes

- Updated dependencies [1ff5afe41]
  - @dopt/react-contextual-assistant@0.0.11
  - @dopt/react-theme@1.2.3

## 0.0.4

### Patch Changes

- c52328d20: Adds the ability to toggle between `GPT` and `Gemini` models for answer summarization. This feature is still being alpha tested and the default is `Gemini`.
- Updated dependencies [b5245658b]
- Updated dependencies [c52328d20]
  - @dopt/ai-assistant-react@0.0.8
  - @dopt/react-contextual-assistant@0.0.10

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
