# Changelog

## 1.1.3

### Patch Changes

- Updated dependencies [874b0427]
- Updated dependencies [b3fba687]
  - @dopt/block-types@1.0.3
  - @dopt/javascript-common@1.2.2

## 1.1.2

### Patch Changes

- 70cff4b0: expose type interfaces for group blocks

## 1.1.1

### Patch Changes

- Updated dependencies [f636dd8b]
  - @dopt/block-types@1.0.2
  - @dopt/javascript-common@1.2.1

## 1.1.0

### Minor Changes

- 850b6fe7: update optimisticUpdates parameter, clarifying what it does and where to use it

### Patch Changes

- Updated dependencies [850b6fe7]
  - @dopt/javascript-common@1.2.0

## 1.0.3

### Patch Changes

- Updated dependencies [a78cce92]
  - @dopt/javascript-common@1.1.0

## 0.4.0

- Remove deprecated `useDopt` hook and `withDopt` HOC

## 0.3.0

- Add `useFlow` and `withFlow` for accessing the flow state and methods on the flow.
- Expose `reset` method on the flow that will reset state of the flow and automatically restart it.

## 0.2.2

- Fetch blocks in parallel to improve performance

## 0.2.1

- Add support for `optimisticUpdates`
- Integrate [@dopt/javascript-common](https://github.com/dopt/odopt/tree/main/packages/%40dopt/javascript-common)

## 0.2.0

- Add support for `logLevel` and logger messages
- Include SDK version in request header
- Add socket support
- Add `useBlock` and `withBlock`
- Mark `useDopt` and `withDopt` as deprecated

## 0.1.0

- Make the `userId` prop on the `<DoptProvider />` support being `undefined` to create an easier contract when trying to initialize the SDK. If `undefined` the SDK will initialize partially, only making requests that don't require the `userId` and returning default values for blocks being accessed via the `useDopt` hook.
- Add logging to help developers understand when the `<DoptProvider />` has potentially been misconfigured.

## 0.0.9

- **Breaking:**: Adds support for specifying flow versions to the `<DoptProvider />`, effectively making code the source of truth for which flow versions are live.

## 0.0.8

- Migrates the build from tsup to rollup due for better es5 target support.
