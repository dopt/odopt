# @dopt/ai-assistant-context

## 0.0.7

### Patch Changes

- 58dcf5165: Fix a bug in `SemanticContext` generation where we would overeagerly traverse from a node to its parent when initializing the semantic content traversal algorithm.
- Updated dependencies [afe048d2e]
  - @dopt/ai-assistant-definition@0.0.5

## 0.0.6

### Patch Changes

- Updated dependencies [c52328d20]
  - @dopt/ai-assistant-definition@0.0.4

## 0.0.5

### Patch Changes

- Updated dependencies [38b30dc58]
  - @dopt/ai-assistant-definition@0.0.3

## 0.0.4

### Patch Changes

- 780a2cf9d: Visual context filters our <video /> and <img /> tags.

## 0.0.3

### Patch Changes

- 910cb4815: Exclude the popover element by classname when taking a screenshot.
- 930f4476c: In `@dopt/ai-assistant-context`, update context generation to accept `Element` instead of `HTMLElement` since the selection process sometimes returns foreign nodes like `svg`, etc. Also, update `visual.ts` to generate `null` in case of errors rather than an empty image. In `@dopt/ai-assistant-javascript`, update validation logic to check whether incoming objects have the appropriate types. Additionally, clean up `instanceof` verification to match with `@dopt/ai-assistant-context`.

## 0.0.2

### Patch Changes

- 0dd1ec27e: Create a changeset to capture work in @dopt/ai-assistant-\*.
- Updated dependencies [0dd1ec27e]
  - @dopt/ai-assistant-definition@0.0.2

## 0.0.1

### Patch Changes

- b992af681: Begin versioning/publishing the AI packages.
- Updated dependencies [b992af681]
  - @dopt/ai-assistant-definition@0.0.1
