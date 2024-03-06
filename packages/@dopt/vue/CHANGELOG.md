# @dopt/vue

## 1.0.2

### Patch Changes

- dec67720c: Update broken links to point to correct URLs given changes to docs.dopt.com.

## 1.0.1

### Patch Changes

- @dopt/semantic-data-layer-card@1.2.1
- @dopt/semantic-data-layer-checklist@0.2.1
- @dopt/semantic-data-layer-hints@1.0.1
- @dopt/semantic-data-layer-modal@0.2.1
- @dopt/semantic-data-layer-tour@0.3.1
- @dopt/javascript-common@2.3.4
- @dopt/javascript@3.8.1

## 1.0.0

### Major Changes

- 2df085f85: Having built a number of custom examples which use @dopt/vue's composables (hints, checklists, tours, cards, and modals) as well as flow and block accessors, we're bumping @dopt/vue up to v1.0.0.

  The **major backwards incompatible** change with this version is that field accessors and item / parent accessors are now `Ref`s which point to functions instead of unwrapped functions.

  By exposing `Ref`s which point to functions, the @dopt/vue SDK allows you to pass the Ref to the function around and the function will be updated whenever fields are initialized and when parents and children have loaded their relationships.

  You can still protect against loading states by using our `useDoptInitialized` and `useFlowStatus` composables if you'd like.

  You can visit the examples and dig into the vue specific ones which expose how simply our cleaned-up primitives allow you to bind to state and content.

## 0.3.0

### Minor Changes

- d3480408d: expose field accessor for component blocks and their children
- d3480408d: expose field accesors for hints and hint items
- 92b5e1a1e: Release the 1.0.0 of the hints component SDKs.

### Patch Changes

- 80bf827c3: Fix `updateUser` to not override previously set values if the values passed in as arguments are null. For example, calling `updateUser('new-id')` should not override the original value of `groupId` that was set. Same for `updateUser(null, 'new-group-id')`.
- Updated dependencies [d3480408d]
- Updated dependencies [d3480408d]
- Updated dependencies [92b5e1a1e]
  - @dopt/semantic-data-layer-checklist@0.2.0
  - @dopt/semantic-data-layer-modal@0.2.0
  - @dopt/semantic-data-layer-card@1.2.0
  - @dopt/semantic-data-layer-tour@0.3.0
  - @dopt/semantic-data-layer-hints@1.0.0
  - @dopt/javascript@3.8.0

## 0.2.0

### Minor Changes

- f9050b07b: Updates socket connection re-try handling within @dopt/javascript and @dopt/vue so that if the socket connection is lost, we will make sure to listen to all flows and blocks once the connection re-opens.

  Also, update @dopt/javascript and @dopt/vue to return `failed: true` in scenarios where a flow doesn't fetch correctly, i.e. when the requested flow doesn't exist.

### Patch Changes

- Updated dependencies [f9050b07b]
  - @dopt/javascript@3.7.0

## 0.1.4

### Patch Changes

- Updated dependencies [0dcb8f37f]
  - @dopt/javascript-common@2.3.3
  - @dopt/javascript@3.6.3

## 0.1.3

### Patch Changes

- Updated dependencies [5815a3783]
  - @dopt/core-rich-text@2.3.0
  - @dopt/semantic-data-layer-card@1.1.1
  - @dopt/semantic-data-layer-checklist@0.1.1
  - @dopt/semantic-data-layer-modal@0.1.1
  - @dopt/semantic-data-layer-tour@0.2.1
  - @dopt/javascript@3.6.2
  - @dopt/javascript-common@2.3.2

## 0.1.2

### Patch Changes

- c9104b298: Added a usage guide (and general vue-friendly) updates to docs.dopt.com. Additionally, fixed a type discrepancy for the `useBlock` composable's `.transitioned` attribute.

## 0.1.1

### Patch Changes

- @dopt/javascript@3.6.1
- @dopt/javascript-common@2.3.1

## 0.1.0

### Minor Changes

- c01bd5a8b: Create the first iteration of @dopt/vue and update @examples/tour-custom-vue to use this iteration. We're releasing @dopt/vue under a minor version while we update our tests and documentation.

### Patch Changes

- Updated dependencies [c01bd5a8b]
- Updated dependencies [c01bd5a8b]
  - @dopt/semantic-data-layer-tour@0.2.0
  - @dopt/javascript@3.6.0
