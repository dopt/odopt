# @dopt/javascript

## 1.4.2

### Patch Changes

- 3398b437: adding group update support on sockets
- Updated dependencies [3398b437]
  - @dopt/javascript-common@1.4.5

## 1.4.1

### Patch Changes

- Updated dependencies [2191b727]
  - @dopt/block-types@3.0.1
  - @dopt/javascript-common@1.4.4

## 1.4.0

### Minor Changes

- a6ab2cc0: add support for uid and sid for blocks
- 7fba401d: make version parameter optional in `dopt.flow(..., version)`; make all intent functions like `complete` return void instead of a promise; unify `dopt.initialized()` to have the same meaning as `useDoptInitialized` in @dopt/react; add a `flow.initialized()` function which maps to `useFlowStatus` in @dopt/react.

## 1.3.5

### Patch Changes

- 7d57b37e: add support for sid. and still support uids
- Updated dependencies [7d57b37e]
  - @dopt/javascript-common@1.4.3

## 1.3.4

### Patch Changes

- 7440d099: moves type definitions from common library into the respective places in which they're used; removes unused type definitions; cleans up typedocs; makes sure that all @dopt/react intents do not return values
- Updated dependencies [7440d099]
  - @dopt/javascript-common@1.4.2

## 1.3.3

### Patch Changes

- Updated dependencies [d632e58e]
  - @dopt/javascript-common@1.4.1

## 1.3.2

### Patch Changes

- Updated dependencies [ef9377e2]
  - @dopt/javascript-common@1.4.0

## 1.3.1

### Patch Changes

- Updated dependencies [e619b78e]
- Updated dependencies [e619b78e]
  - @dopt/block-types@3.0.0
  - @dopt/javascript-common@1.3.0

## 1.3.0

### Minor Changes

- f2183886: adds optimisticUpdates to @dopt/javascript and unifies optimisticUpdates behavior across react and JS sdks to only work with step blocks

## 1.2.9

### Patch Changes

- ce2ac3f4: clean up type names and add JS / TS doc strings to create better typedocs for @dopt/react and @dopt/javascript packages
- Updated dependencies [ce2ac3f4]
  - @dopt/javascript-common@1.2.8
  - @dopt/block-types@2.0.4
  - @dopt/mercator@1.0.2
  - @dopt/logger@0.0.3

## 1.2.8

### Patch Changes

- Updated dependencies [4661f731]
  - @dopt/block-types@2.0.3
  - @dopt/javascript-common@1.2.7

## 1.2.7

### Patch Changes

- Updated dependencies [67d27325]
  - @dopt/block-types@2.0.2
  - @dopt/mercator@1.0.1
  - @dopt/logger@0.0.2
  - @dopt/javascript-common@1.2.6

## 1.2.6

### Patch Changes

- Updated dependencies [d02315ba]
  - @dopt/block-types@2.0.1
  - @dopt/javascript-common@1.2.5

## 1.2.5

### Patch Changes

- 2712b44c: returns field definitions with values from @blocks/service and cleans up field access in @dopt/javascript

## 1.2.4

### Patch Changes

- Updated dependencies [4478f0a5]
  - @dopt/block-types@2.0.0
  - @dopt/javascript-common@1.2.4

## 1.2.3

### Patch Changes

- Updated dependencies [a26aefdc]
  - @dopt/block-types@1.1.0
  - @dopt/javascript-common@1.2.3

## 1.2.2

### Patch Changes

- Updated dependencies [874b0427]
- Updated dependencies [b3fba687]
  - @dopt/block-types@1.0.3
  - @dopt/javascript-common@1.2.2

## 1.2.1

### Patch Changes

- Updated dependencies [f636dd8b]
  - @dopt/block-types@1.0.2
  - @dopt/javascript-common@1.2.1

## 1.2.0

### Minor Changes

- 850b6fe7: update optimisticUpdates parameter, clarifying what it does and where to use it

### Patch Changes

- Updated dependencies [850b6fe7]
  - @dopt/javascript-common@1.2.0

## 1.1.0

### Minor Changes

- a78cce92: fixes issues with state access and updates for model blocks within set blocks; adds scaffolding to retrieve field values

### Patch Changes

- Updated dependencies [a78cce92]
  - @dopt/javascript-common@1.1.0
