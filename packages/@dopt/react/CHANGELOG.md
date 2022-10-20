# Changelog

## 0.1.9

- Make the `userId` prop on the `<DoptProvider />` support being `undefined` to create an easier contract when trying to initialize the SDK. If `undefined` the SDK will initialize partially, only making requests that don't require the `userId` and returning default values for blocks being accessed via the `useDopt` hook.
- Add logging to help developers understand when the `<DoptProvider />` has potentially been misconfigured.

## 0.0.9

- **Breaking:**: Adds support for specifying flow versions to the `<DoptProvider />`, effectively making code the source of truth for which flow versions are live.

## 0.0.8

- Migrates the build from tsup to rollup due for better es5 target support.
