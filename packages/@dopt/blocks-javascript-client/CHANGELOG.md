# @dopt/blocks-javascript-client

## 1.1.0

### Minor Changes

- 856005780: Exposes RichText as a top level field type. This additive change allows for RichText objects to be returned by the blocks API and to be consumed and surfaced via the Blocks client, and React and Javascript SDKs.

## 1.0.0

### Major Changes

- 60df5938: ## Deprecation of Group blocks

  The 2.0.0 release will be removing the Group blocks from Dopt. This includes access to the Group blocks in the canvas, APIs, and SDKs.

  **tl;dr** We thought the abstraction of the Group block would be useful, but we’ve found it can be hard to understand and doesn’t support the logic needed for many flows. We think the new functionality added in this release (e.g., named paths, back paths, Gate blocks, branching on user properties) strike a better balance between being explicit and composable. Below you will find a more detailed explanation of how these changes manifest in the client.

  ## Client changes

  `blockGoToIntent` has been removed from the client. This method was used with groups and is now deprecated.

  `blockIntent` has been renamed to `blockTransitions`. This new method now takes a set of transitions (named paths) rather than a single named intent.

  `flowIntent`'s `intent` parameter now accepts `stop` instead of `exit` and `finish` instead of `complete`.

  ```diff
  - flowIntent(..., 'exit');
  + flowIntent(..., 'stop');

  - flowIntent(..., 'complete');
  + flowIntent(..., 'finish');
  ```

## 0.0.7

### Patch Changes

- 4661f731: Adding readme

## 0.0.6

### Patch Changes

- e3cd4ae0: adding tags to name API more coorectly

## 0.0.5

### Patch Changes

- c4725b0e: adding opensurce true

## 0.0.4

### Patch Changes

- d02315ba: Adding refs to help blocks-javascript-client

## 0.0.3

### Patch Changes

- b3fba687: Adding alias Group to Set type

## 0.0.2

### Patch Changes

- 9d0b426f: updating the files to publish

## 0.0.1

### Patch Changes

- f636dd8b: Introducing the blocks-javascript-client
