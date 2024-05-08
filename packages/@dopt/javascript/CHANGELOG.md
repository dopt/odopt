# @dopt/javascript

## 3.8.3

### Patch Changes

- @dopt/semantic-data-layer-card@1.2.3
- @dopt/semantic-data-layer-checklist@0.2.3
- @dopt/semantic-data-layer-hints@1.0.3
- @dopt/semantic-data-layer-modal@0.2.3
- @dopt/semantic-data-layer-tour@0.3.3
- @dopt/javascript-common@2.3.6

## 3.8.2

### Patch Changes

- @dopt/semantic-data-layer-card@1.2.2
- @dopt/semantic-data-layer-checklist@0.2.2
- @dopt/semantic-data-layer-hints@1.0.2
- @dopt/semantic-data-layer-modal@0.2.2
- @dopt/semantic-data-layer-tour@0.3.2
- @dopt/javascript-common@2.3.5

## 3.8.1

### Patch Changes

- @dopt/semantic-data-layer-card@1.2.1
- @dopt/semantic-data-layer-checklist@0.2.1
- @dopt/semantic-data-layer-hints@1.0.1
- @dopt/semantic-data-layer-modal@0.2.1
- @dopt/semantic-data-layer-tour@0.3.1
- @dopt/javascript-common@2.3.4

## 3.8.0

### Minor Changes

- 92b5e1a1e: Release the 1.0.0 of the hints component SDKs.

### Patch Changes

- Updated dependencies [d3480408d]
- Updated dependencies [d3480408d]
- Updated dependencies [92b5e1a1e]
  - @dopt/semantic-data-layer-checklist@0.2.0
  - @dopt/semantic-data-layer-modal@0.2.0
  - @dopt/semantic-data-layer-card@1.2.0
  - @dopt/semantic-data-layer-tour@0.3.0
  - @dopt/semantic-data-layer-hints@1.0.0

## 3.7.0

### Minor Changes

- f9050b07b: Updates socket connection re-try handling within @dopt/javascript and @dopt/vue so that if the socket connection is lost, we will make sure to listen to all flows and blocks once the connection re-opens.

  Also, update @dopt/javascript and @dopt/vue to return `failed: true` in scenarios where a flow doesn't fetch correctly, i.e. when the requested flow doesn't exist.

## 3.6.3

### Patch Changes

- Updated dependencies [0dcb8f37f]
  - @dopt/javascript-common@2.3.3

## 3.6.2

### Patch Changes

- Updated dependencies [5815a3783]
  - @dopt/core-rich-text@2.3.0
  - @dopt/semantic-data-layer-card@1.1.1
  - @dopt/semantic-data-layer-checklist@0.1.1
  - @dopt/semantic-data-layer-modal@0.1.1
  - @dopt/semantic-data-layer-tour@0.2.1
  - @dopt/javascript-common@2.3.2

## 3.6.1

### Patch Changes

- Updated dependencies [1f5499ee6]
  - @dopt/logger@0.2.0
  - @dopt/javascript-common@2.3.1

## 3.6.0

### Minor Changes

- c01bd5a8b: No external facing APIs for @dopt/javascript have changed. However, in this release, we've rewritten @dopt/javascript to be more reactive and allow access of flows, blocks, and components before the instance has fully initialized. We've fixed a number of bugs with @dopt/javascript specifically around accessing these objects before the instance was initialized. Additionally, we've introduced a number of quality of life improvements with respect to typedocs, README.md, etc. The new release of @dopt/javascript is used internally by @dopt/vue to power our newly released Vue SDK.

### Patch Changes

- Updated dependencies [c01bd5a8b]
  - @dopt/semantic-data-layer-tour@0.2.0

## 3.5.0

### Minor Changes

- 8bd8d1167: Our opensource packages previously produced build artifacts that were intended to to be friendly to various build and module systems by

  1. Using `"type": "commonjs"` in their `package.json` (the default and less modern configuration)
  1. Using file extensions to delineate between module systems (e.g. `mjs` for ESM and `cjs` for CJS)

  This strategy, while seemingly friendly more freindly than using `"type": "module"`, caused issue for older build tools that do not support these file extensions.

  This change moves all of our open source packages and their transitive `"dependencies"` to use `@dopt/pkg-build`, our newly created CLI for building packages in the most backward compatible way we can come up with.

  This strategy shifts us to

  1. Use `"type": "module"` in our `package.json`
  1. Output files with `.js` extensions
  1. Produce a `./cjs` directory in the build output that contains a thin `package.json`, which configures `"type": "commonjs"` explicitly, conceptually overriding the `"type": "module"` configuration of the actual package.json.

### Patch Changes

- Updated dependencies [8bd8d1167]
  - @dopt/core-rich-text@2.2.0
  - @dopt/semantic-data-layer-card@1.1.0
  - @dopt/semantic-data-layer-checklist@0.1.0
  - @dopt/semantic-data-layer-modal@0.1.0
  - @dopt/semantic-data-layer-tour@0.1.0
  - @dopt/javascript-common@2.3.0
  - @dopt/logger@0.1.0

## 3.4.1

### Patch Changes

- Updated dependencies [e8e8049bb]
  - @dopt/core-rich-text@2.1.0
  - @dopt/semantic-data-layer-card@1.0.3
  - @dopt/semantic-data-layer-checklist@0.0.8
  - @dopt/semantic-data-layer-modal@0.0.9
  - @dopt/semantic-data-layer-tour@0.0.8
  - @dopt/javascript-common@2.2.2

## 3.4.0

### Minor Changes

- 01e63c702: internalize @dopt/javascript's `zustand/vanilla` and `zustand/middleware` dependencies by changing how the package is built. zustand generates non-compatible CJS, which previously required workarounds if using @dopt/javascript in CJS. after this version, all consumed zustand code will be internalized within the @dopt/javascript bundle, ensuring that the library is CJS compatible.

### Patch Changes

- eee149c59: refactor rich text types
- Updated dependencies [eee149c59]
  - @dopt/core-rich-text@2.0.0
  - @dopt/semantic-data-layer-checklist@0.0.7
  - @dopt/semantic-data-layer-modal@0.0.8
  - @dopt/semantic-data-layer-card@1.0.2
  - @dopt/semantic-data-layer-tour@0.0.7
  - @dopt/javascript-common@2.2.1

## 3.3.0

### Minor Changes

- 9d4037411: @dopt/javascript-common's API client now supports specifying "uncommitted" and "latest" as tags for a flow version when calling `GET` or `POST` on the flow. This update to the API client is also wired through @dopt/javascript and @dopt/react so users can specify those flow tags when initializing the packages. READMEs are also updated for both packages.

### Patch Changes

- Updated dependencies [9d4037411]
  - @dopt/javascript-common@2.2.0

## 3.2.1

### Patch Changes

- @dopt/javascript-common@2.1.1

## 3.2.0

### Minor Changes

- e18bb04b4: Add force? options to @dopt/react and @dopt/javascript SDKs. This introduces functionality keeping the SDKs in line with our APIs and clients. When `force: true` is passed into the `start` or `reset` functions from `useFlow` and `Flow` respectively, those intents will forcefully start the flow. This means that they will start the flow despite any targeting or entry conditions. Otherwise, the intents will only start the flow if those conditions are met.

### Patch Changes

- Updated dependencies [e18bb04b4]
  - @dopt/javascript-common@2.1.0

## 3.1.2

### Patch Changes

- @dopt/javascript-common@2.0.9

## 3.1.1

### Patch Changes

- Updated dependencies [623a7b32c]
  - @dopt/core-rich-text@1.0.1
  - @dopt/semantic-data-layer-card@1.0.1
  - @dopt/semantic-data-layer-checklist@0.0.6
  - @dopt/semantic-data-layer-modal@0.0.7
  - @dopt/semantic-data-layer-tour@0.0.6
  - @dopt/javascript-common@2.0.8
  - @dopt/logger@0.0.3

## 3.1.0

### Minor Changes

- 40122596e: Add a destroy method that manually closes the socket connection.

### Patch Changes

- @dopt/javascript-common@2.0.7

## 3.0.5

### Patch Changes

- Updated dependencies [3d6534705]
  - @dopt/semantic-data-layer-card@1.0.0

## 3.0.4

### Patch Changes

- Updated dependencies [80cd31924]
  - @dopt/core-rich-text@1.0.0
  - @dopt/semantic-data-layer-checklist@0.0.5
  - @dopt/semantic-data-layer-modal@0.0.6
  - @dopt/semantic-data-layer-tour@0.0.5
  - @dopt/javascript-common@2.0.6

## 3.0.3

### Patch Changes

- Updated dependencies [0cab59fd1]
  - @dopt/core-rich-text@0.0.4
  - @dopt/semantic-data-layer-checklist@0.0.4
  - @dopt/semantic-data-layer-modal@0.0.5
  - @dopt/semantic-data-layer-tour@0.0.4
  - @dopt/javascript-common@2.0.5

## 3.0.2

### Patch Changes

- Updated dependencies [ea44007e8]
  - @dopt/core-rich-text@0.0.3
  - @dopt/semantic-data-layer-checklist@0.0.3
  - @dopt/semantic-data-layer-modal@0.0.4
  - @dopt/semantic-data-layer-tour@0.0.3
  - @dopt/javascript-common@2.0.4

## 3.0.1

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [e57fc0407]
- Updated dependencies [bcc6cb36f]
  - @dopt/semantic-data-layer-checklist@0.0.2
  - @dopt/semantic-data-layer-tour@0.0.2
  - @dopt/javascript-common@2.0.3
  - @dopt/core-rich-text@0.0.2
  - @dopt/semantic-data-layer-modal@0.0.3

## 3.0.0

### Major Changes

- d6732a3b4: Both @dopt/react and @dopt/javascript SDKs have been updated with respect to how the `field` accessor function works on `Block` instances. After this change, if Dopt is loading or a field doesn't exist on a `Block` (i.e. you try to access a field you haven't created in app.dopt.com), Dopt will return `undefined`. If a field is present, then Dopt will return the value of the field which may be `null` if the field has a value of empty in app.dopt.com. Additionally, both SDKs no longer support the optional `defaultValue` parameter -- if you would like to specify a default for the returned value, you can use the nullish operator: `block.field<string>('title') ?? '(empty)'`. Finally, in this major change for @dopt/javascript, we remove the deprecated and unused version parameter for `dopt.flow('name', <version>)` which was deprecated in 2.x.x.

### Minor Changes

- 856005780: Exposes RichText as a top level field type. This additive change allows for RichText objects to be returned by the blocks API and to be consumed and surfaced via the Blocks client, and React and Javascript SDKs.

### Patch Changes

- Updated dependencies [d6732a3b4]
- Updated dependencies [4f9a8f8c1]
  - @dopt/semantic-data-layer-checklist@0.0.1
  - @dopt/semantic-data-layer-modal@0.0.2
  - @dopt/semantic-data-layer-tour@0.0.1
  - @dopt/core-rich-text@0.0.1
  - @dopt/javascript-common@2.0.2

## 2.0.4

### Patch Changes

- Updated dependencies [aba3913d6]
  - @dopt/javascript-common@2.0.1

## 2.0.3

### Patch Changes

- bfb03f6c: Ensure that optimisticUpdates only trigger when blocks are active. This ensures that blocks don't artificially get marked as `entered: true` and `exited: true`. These state fields were newly introduced in 2.0.0. Additionally, update `@dopt/javascript` README.md to reflect changes to state management and subscribe in v2.0.0.

## 2.0.2

### Patch Changes

- 76103615: fixing formatting

## 2.0.1

### Patch Changes

- 1d53d9a0: For `Block<T>` interface and class types, update to an optional `T = unknown` generic. This will allow consumers to reference `Block` without having to write out `Block<unknown>`. Also, update Dopt's getting-started-checklist example to reflect this change.

## 2.0.0

### Major Changes

- 60df5938: ## Deprecation of Group blocks

  The 2.0.0 release will be removing the Group blocks from Dopt. This includes access to the Group blocks in the canvas, APIs, and SDKs.

  **tl;dr** We thought the abstraction of the Group block would be useful, but we’ve found it can be hard to understand and doesn’t support the logic needed for many flows. We think the new functionality added in this release (e.g., named paths, back paths, Gate blocks, branching on user properties) strike a better balance between being explicit and composable. Below you will find a more detailed explanation of how these changes manifest in the SDK.

  ## `Block`

  ### Object changes

  We've migrated the `state()` function to be a `state` accessor (property). Instead of calling `block.state()`, you will now do `block.state`.

  ```diff
  - block.state()
  + block.state
  ```

  We've renamed the `completed` state to `exited`. Because blocks can now be accessed multiple times with cyclic paths, `exited` is more meaningful.

  ```diff
  - block.state.completed
  + block.state.exited
  ```

  We've renamed the `getField` function on the block instance to `field` to match our other accessors.

  ```diff
  - block.getField('field-name')
  + block.field('field-name')
  ```

  `block.subscribe(listener)` now calls your `listener` with the `block` instance rather than just a data representation. This means that you can now call the `field` accessor, use the `transition` function, and more, with the `subscribe` function.

  ```js
  block.subscribe((changed) => changed.field('field-name'));
  ```

  ### Transitions

  The block object representation has also changed to accommodate for edges in the flow having names (called transitions).

  To support transitions, we've removed the `complete` function on blocks and replaced it with a `transition` function that can be used to specify what path to traverse from this block. The new `transition` methods requires the name of the `transition` (the label on the edge) you are transitioning to. All pre-existing edges will be migrated to be named 'default';

  ```diff
  - block.complete();
  + block.transition('default');
  ```

  We’ve also added a `transitioned` object to the block that will track the state of those paths, e.g., if the user moves along an outgoing path `next` from a block named `A`, the `block.transitioned.next` on block `A` value would change from `false` to `true`.

  The properties of the transition object are a function of the paths in the flow you’ve designed in Dopt. To flexibly accommodate for that, the block is generic with respect to the transitions associated with it.

  ```ts
  const block = dopt.block<['edge-one', 'edge-two']>('edge-id');
  ```

  You can find examples of how to instantiate these blocks with generics at [app.dopt.com](https://app.dopt.com) when you select step blocks within a flow.

  ### Removed group methods

  The following methods were all associated with groups which are deprecated.

  - `block.next`
  - `block.prev`
  - `block.goTo`
  - `block.getCompleted`
  - `block.getUncompleted`
  - `block.getActive`
  - `block.getInactive`

  ## `Flow`

  ### Object changes

  We've migrated the `state()` function to be a `state` accessor (property). Instead of calling `flow.state()`, you will now do `flow.state`.

  ```diff
  - flow.state()
  + flow.state
  ```

  The flow `exited` state has been renamed to `stopped`. The flow `exit` function has been renamed to `stop`.

  ```diff
  - flow.state.exited
  + flow.state.stopped

  - flow.exit()
  + flow.stop()
  ```

  The flow `completed` state has been renamed to `finished`. The flow `complete` function has been renamed to `finish`.

  ```diff
  - flow.state.completed
  + flow.state.finished

  - flow.complete()
  + flow.finish()
  ```

  The `flow.blocks()` function now returns full, up-to-date block instances on which methods like `field` and `transition` can be called.

  ```js
  const blocks = flow.blocks();
  blocks.forEach((block) => block.field('field-name'));
  blocks.forEach((block) => block.transition('default'));
  ```

  `flow.subscribe(listener)` now calls your `listener` with the `flow` instance rather than just a data representation. This means that you can now call the `blocks` accessor, access intent functions, and more with the `subscribe` function.

  ```js
  flow.subscribe((changed) => changed.blocks());
  ```

### Patch Changes

- Updated dependencies [60df5938]
  - @dopt/javascript-common@2.0.0

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
