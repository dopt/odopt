# @dopt/ai-assistant-javascript

## 0.0.16

### Patch Changes

- @dopt/ai-javascript-client@0.1.2

## 0.0.15

### Patch Changes

- Updated dependencies [14582c5db]
  - @dopt/ai-javascript-client@0.1.1

## 0.0.14

### Patch Changes

- Updated dependencies [78ed01b9a]
- Updated dependencies [db4e1b580]
  - @dopt/ai-javascript-client@0.1.0

## 0.0.13

### Patch Changes

- 2b7e6af6b: Update READMEs + fix repo/homepage fields in package.json
- Updated dependencies [2b7e6af6b]
  - @dopt/ai-assistant-definition@0.0.8
  - @dopt/ai-assistant-context@0.0.10
  - @dopt/ai-javascript-client@0.0.10

## 0.0.12

### Patch Changes

- 87e55c3a0: fixes error management by adding client-side error handlers; exposes these handlers in both `@dopt/react-contextual-assistant` and `@dopt/ai-assistant-react`; allows users to configure default error messages via an `errorMessages` property
- Updated dependencies [87e55c3a0]
  - @dopt/ai-assistant-definition@0.0.7
  - @dopt/ai-assistant-context@0.0.9
  - @dopt/ai-javascript-client@0.0.9

## 0.0.11

### Patch Changes

- 955c75560: feat: unset status when assistant response is complete
  fix: unset query when selection changes

## 0.0.10

### Patch Changes

- 538edaa80: Across `ai.dopt.com` and our SDKs, we now support using a `query` parameter which will be passed in as an input to our backend LLM models both for search and retrieval and for generative answers. We also remove support for (read: ignore) the `model` parameter -- specified values will just be ignored. We may expose this parameter in the future. Finally, we clean up context generation to truly make element, document, and visual contexts optional. In an upcoming change, we will add question-answer functionality to `@dopt/react-contextual-assistant`.
- Updated dependencies [538edaa80]
  - @dopt/ai-assistant-definition@0.0.6
  - @dopt/ai-assistant-context@0.0.8
  - @dopt/ai-javascript-client@0.0.8

## 0.0.9

### Patch Changes

- Updated dependencies [58dcf5165]
- Updated dependencies [afe048d2e]
  - @dopt/ai-assistant-context@0.0.7
  - @dopt/ai-assistant-definition@0.0.5
  - @dopt/ai-javascript-client@0.0.7

## 0.0.8

### Patch Changes

- c52328d20: Adds the ability to toggle between `GPT` and `Gemini` models for answer summarization. This feature is still being alpha tested and the default is `Gemini`.
- Updated dependencies [c52328d20]
  - @dopt/ai-assistant-definition@0.0.4
  - @dopt/ai-assistant-context@0.0.6
  - @dopt/ai-javascript-client@0.0.6

## 0.0.7

### Patch Changes

- Updated dependencies [38b30dc58]
  - @dopt/ai-assistant-definition@0.0.3
  - @dopt/ai-javascript-client@0.0.5
  - @dopt/ai-assistant-context@0.0.5

## 0.0.6

### Patch Changes

- Updated dependencies [780a2cf9d]
  - @dopt/ai-assistant-context@0.0.4

## 0.0.5

### Patch Changes

- 930f4476c: In `@dopt/ai-assistant-context`, update context generation to accept `Element` instead of `HTMLElement` since the selection process sometimes returns foreign nodes like `svg`, etc. Also, update `visual.ts` to generate `null` in case of errors rather than an empty image. In `@dopt/ai-assistant-javascript`, update validation logic to check whether incoming objects have the appropriate types. Additionally, clean up `instanceof` verification to match with `@dopt/ai-assistant-context`.
- Updated dependencies [910cb4815]
- Updated dependencies [930f4476c]
  - @dopt/ai-assistant-context@0.0.3

## 0.0.4

### Patch Changes

- Updated dependencies [9e8e6d979]
  - @dopt/ai-javascript-client@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies [b729204c8]
  - @dopt/ai-javascript-client@0.0.3

## 0.0.2

### Patch Changes

- 0dd1ec27e: Create a changeset to capture work in @dopt/ai-assistant-\*.
- Updated dependencies [0dd1ec27e]
  - @dopt/ai-assistant-context@0.0.2
  - @dopt/ai-assistant-definition@0.0.2
  - @dopt/ai-javascript-client@0.0.2

## 0.0.1

### Patch Changes

- b992af681: Begin versioning/publishing the AI packages.
- Updated dependencies [b992af681]
  - @dopt/ai-assistant-definition@0.0.1
  - @dopt/ai-assistant-context@0.0.1
  - @dopt/ai-javascript-client@0.0.1
