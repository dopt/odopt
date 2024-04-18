# Changelog

## 4.2.1

### Patch Changes

- 14582c5db: A previous combination of minor and patch upgrades failed to publish because of upstream issues with NPM and other parts of our build chain. This change re-publishes all the affected packages. To look through previous changes, look into the changelog(s) of any affected packages.
- Updated dependencies [14582c5db]
  - @dopt/surfaces-javascript-client@0.1.1

## 4.2.0

### Minor Changes

- 33edbe1f1: Expose Surfaces/Messages in the SDK.

### Patch Changes

- Updated dependencies [78ed01b9a]
- Updated dependencies [33edbe1f1]
  - @dopt/surfaces-javascript-client@0.1.0

## 4.1.3

### Patch Changes

- @dopt/javascript-common@2.3.5

## 4.1.2

### Patch Changes

- dec67720c: Update broken links to point to correct URLs given changes to docs.dopt.com.

## 4.1.1

### Patch Changes

- @dopt/javascript-common@2.3.4

## 4.1.0

### Minor Changes

- 5a072a2c2: We've refactored how `@dopt/react` disconnects its internal socket when the parent `document` is backgrounded. When `@dopt/react` is used within a browser, we add a new `useEffect` hook which listens for `'visibilitychange'` events on the `document`. If the `document` is backgrounded (non-visible) for more than 10 minutes, we will disconnect `@dopt/react`'s internal socket. When the tab is foregrounded again, we fetch all necessary state and re-connect the socket. These changes improve session and socket stability and ensure state consistency across backgrounding and foregrounding.

## 4.0.0

### Major Changes

- 798085827: Several major updates have been made to `@dopt/react` to improve client-side performance, socket connection stability, and hook triggering patterns.

  `@dopt/react` no longer calls `flow.start` -- since version 3.x, Dopt's @blocks/api backend already supported automatically triggering start calls as necessary without client-side intervention, but the code was left in the SDK in case any changes needed to be made to @blocks/api.

  Hooks within `@dopt/react `have been rewritten to have cleaner dependencies and several hooks have been removed where unnecessary.

  `@dopt/react` now automatically reconnects with our backend when connectivity across our websocket connection drops -- previously, this process was manual and somewhat error-prone.

  The only breaking change in this update is that `@dopt/react` has dropped support for our `withBlock` and `withFlow` higher-order-components (HOCs). When `@dopt/react` was initially published in 2021, a significant minority of users were still using legacy class components and requested these HOC abstractions. With this version, we no longer ship these HOCs within the package -- users can still create their own HOC abstractions using our `useBlock` and `useFlow` hooks if they desire.

  No other exposed SDK methods, APIs, or accessors have changed as a result of this major update.

## 3.3.5

### Patch Changes

- Updated dependencies [0dcb8f37f]
  - @dopt/javascript-common@2.3.3

## 3.3.4

### Patch Changes

- @dopt/javascript-common@2.3.2

## 3.3.3

### Patch Changes

- a3a2cec21: - add explicit react import
  - add eslint rules for react/react-in-jsx-scope and react/jsx-uses-react
  - @dopt/javascript-common@2.3.1
  - @dopt/logger@0.2.0

## 3.3.2

### Patch Changes

- Updated dependencies [1f5499ee6]
  - @dopt/logger@0.2.0
  - @dopt/javascript-common@2.3.1

## 3.3.1

### Patch Changes

- c01bd5a8b: Adds to and updates typedocs.

## 3.3.0

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
  - @dopt/javascript-common@2.3.0
  - @dopt/logger@0.1.0

## 3.2.2

### Patch Changes

- @dopt/javascript-common@2.2.2

## 3.2.1

### Patch Changes

- @dopt/javascript-common@2.2.1

## 3.2.0

### Minor Changes

- 9d4037411: @dopt/javascript-common's API client now supports specifying "uncommitted" and "latest" as tags for a flow version when calling `GET` or `POST` on the flow. This update to the API client is also wired through @dopt/javascript and @dopt/react so users can specify those flow tags when initializing the packages. READMEs are also updated for both packages.

### Patch Changes

- Updated dependencies [9d4037411]
  - @dopt/javascript-common@2.2.0

## 3.1.1

### Patch Changes

- @dopt/javascript-common@2.1.1

## 3.1.0

### Minor Changes

- e18bb04b4: Add force? options to @dopt/react and @dopt/javascript SDKs. This introduces functionality keeping the SDKs in line with our APIs and clients. When `force: true` is passed into the `start` or `reset` functions from `useFlow` and `Flow` respectively, those intents will forcefully start the flow. This means that they will start the flow despite any targeting or entry conditions. Otherwise, the intents will only start the flow if those conditions are met.

### Patch Changes

- Updated dependencies [e18bb04b4]
  - @dopt/javascript-common@2.1.0

## 3.0.7

### Patch Changes

- @dopt/javascript-common@2.0.9

## 3.0.6

### Patch Changes

- 58ec892d7: configure .tsx linting in @dopt/config and lint and update all packages which surface linting errors.
  - @dopt/javascript-common@2.0.8
  - @dopt/logger@0.0.3

## 3.0.5

### Patch Changes

- @dopt/javascript-common@2.0.7

## 3.0.4

### Patch Changes

- @dopt/javascript-common@2.0.6

## 3.0.3

### Patch Changes

- @dopt/javascript-common@2.0.5

## 3.0.2

### Patch Changes

- @dopt/javascript-common@2.0.4

## 3.0.1

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [e57fc0407]
  - @dopt/javascript-common@2.0.3

## 3.0.0

### Major Changes

- d6732a3b4: Both @dopt/react and @dopt/javascript SDKs have been updated with respect to how the `field` accessor function works on `Block` instances. After this change, if Dopt is loading or a field doesn't exist on a `Block` (i.e. you try to access a field you haven't created in app.dopt.com), Dopt will return `undefined`. If a field is present, then Dopt will return the value of the field which may be `null` if the field has a value of empty in app.dopt.com. Additionally, both SDKs no longer support the optional `defaultValue` parameter -- if you would like to specify a default for the returned value, you can use the nullish operator: `block.field<string>('title') ?? '(empty)'`. Finally, in this major change for @dopt/javascript, we remove the deprecated and unused version parameter for `dopt.flow('name', <version>)` which was deprecated in 2.x.x.

### Minor Changes

- 856005780: Exposes RichText as a top level field type. This additive change allows for RichText objects to be returned by the blocks API and to be consumed and surfaced via the Blocks client, and React and Javascript SDKs.

### Patch Changes

- @dopt/javascript-common@2.0.2

## 2.1.0

### Minor Changes

- 6200ee8ea: Update the return type for the field accessor to more accurately represent the values returned.

## 2.0.6

### Patch Changes

- Update @dopt/javascript-common to provide an appropriate log message when the client disconnects manually (today, this is only done in @dopt/react).

- Updated dependencies [aba3913d6]
  - @dopt/javascript-common@2.0.1

## 2.0.4

### Patch Changes

- 263062e5a: Make sure that the socket connection with Dopt closes when the provider is unmounted. Otherwise, we will leak sockets on each mount / unmount.

## 2.0.3

### Patch Changes

- bfb03f6c: Ensure that optimisticUpdates only trigger when blocks are active. This ensures that blocks don't artificially get marked as `entered: true` and `exited: true`. These state fields were newly introduced in 2.0.0. Additionally, update `@dopt/javascript` README.md to reflect changes to state management and subscribe in v2.0.0.

## 2.0.2

### Patch Changes

- e0c2bbe6: fixing lint

## 2.0.1

### Patch Changes

- 1d53d9a0: For `Block<T>` interface and class types, update to an optional `T = unknown` generic. This will allow consumers to reference `Block` without having to write out `Block<unknown>`. Also, update Dopt's getting-started-checklist example to reflect this change.

## 2.0.0

### Major Changes

- 60df5938: V2 of the SDK

## Deprecation of Group blocks

The 2.0.0 release will be removing the Group blocks from Dopt. This includes access to the Group blocks in the canvas, APIs, and SDKs.

**tl;dr** We thought the abstraction of the Group block would be useful, but we’ve found it can be hard to understand and doesn’t support the logic needed for many flows. We think the new functionality added in this release (e.g., named paths, back paths, Gate blocks, branching on user properties) strike a better balance between being explicit and composable. Below you will find a more detailed explanation of how these changes manifest in the SDK.

## The following objects have changed

### `Block`

The block's `getField` function has been renamed to `field`. This matches our other accessors.

The block's `completed` state has been renamed to `exited`. Because blocks can now be accessed multiple times with cyclic paths, `exited` is more meaningful.

Additionally, the block object representation has changed significantly to accommodate for paths in the flow having names. We’ve added a `transitioned` object to the block that will track the state of those paths, e.g., if the user moves along an outgoing path `next` from a block named `A`, the `transitioned.next` on block `A` value would change from `false` to `true`.

The properties of the transition object are a function of the paths in the flow you’ve designed in Dopt. To flexibly accommodate for that, the block is generic with respect to the transitions associated with it; see the `useBlock` section below.

**Before**

```ts
interface Block {
  readonly kind: 'block';
  readonly type: 'model';
  readonly uid: string;
  readonly sid: string;
  readonly version: number;
  readonly state: {
    active: boolean;
    completed: boolean;
  };
  getField: <V extends Field['value']>(
    name: string,
    defaultValue?: V
  ) => V | null;
}
```

**After**

```ts
interface Block<T> {
  kind: 'block';
  type: 'model';
  uid: string;
  sid: string;
  version: number;
  state: {
    active: boolean;
    entered: boolean;
    exited: boolean;
  };
  transitioned: T extends [string, ...string[]]
    ? Record<T[number], boolean | undefined>
    : Record<string, boolean | undefined>;
  field: <V extends Field['value']>(name: string, defaultValue?: V) => V | null;
}
```

### `Flow`

The flow `exited` state has been renamed to `stopped`.

The flow `completed` state has been renamed to `finished`.

The flow `blocks` value now contains an array of full, up-to-date block instances on which methods like `field` can be called.

## The following methods have been removed

- `useOrderedGroup`
- `useUnorderedGroup`
- `withOrderedGroup`
- `withUnorderedGroup`

These methods were all associated with groups which have been deprecated.

## The following methods have signature changes

### `useFlow`

`useFlow` changes are primarily renames of the intent methods.

The `exit` intent was renamed to `stop`, and the `complete` intent was renamed to `finish`.

You can also find a type-level summary of the changes below.

```diff
-  exit: () => void | undefined;
+  stop: () => void | undefined;

-  complete: () => void | undefined;
+  finish: () => void | undefined;
}
```

### `useBlock`

`useBlock` has two large changes.

Instead of the `BlockIntentions` returning an object containing a named `complete` method, we return a `transition` function that can be used to specify what path to traverse from this block. The new `transition` methods requires the name of the `transition` (the label on the edge) you are transitioning to. All pre-existing edges will be migrated to be named 'default';

```diff
- const [block, { complete }] = useBlock('edge-id');
- complete();

+ const [block, transition] = useBlock('edge-id');
+ transition('default');
```

The `useBlock` hook is now optionally generic. This gives us a way to type the `transitioned` property, given that this data is a function of the flow you designed in Dopt.

```ts
const [block, transition] = useBlock<['edge-one', 'edge-two']>('edge-id');
```

You can find examples of how to write a `useBlock` with generics at [app.dopt.com](https://app.dopt.com) when you select step blocks within a flow.

You can also find a type-level summary of the changes below.

```diff
-type BlockComplete = () => void | undefined;
+type BlockTransition = (...inputs: string[]) => void | undefined;

-export function useBlock(
-  id: string
-): [block: Block, { complete: BlockComplete }];
+export function useBlock<T>(
+  id: string
+): [block: Block<T>, transition: BlockTransition] {
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

- 396f4e80: remove MockProvider and mocking functionality from the react SDK

## 1.3.3

### Patch Changes

- 7d57b37e: add support for sid. and still support uids
- Updated dependencies [7d57b37e]
  - @dopt/javascript-common@1.4.3

## 1.3.2

### Patch Changes

- 7440d099: moves type definitions from common library into the respective places in which they're used; removes unused type definitions; cleans up typedocs; makes sure that all @dopt/react intents do not return values
- Updated dependencies [7440d099]
  - @dopt/javascript-common@1.4.2

## 1.3.1

### Patch Changes

- Updated dependencies [d632e58e]
  - @dopt/javascript-common@1.4.1

## 1.3.0

### Minor Changes

- ef9377e2: update javascript-common package to process intent header and add hooks into react package which allows consumers to track Dopt provider initialization and flow level initialization

### Patch Changes

- Updated dependencies [ef9377e2]
  - @dopt/javascript-common@1.4.0

## 1.2.1

### Patch Changes

- Updated dependencies [e619b78e]
- Updated dependencies [e619b78e]
  - @dopt/block-types@3.0.0
  - @dopt/javascript-common@1.3.0

## 1.2.0

### Minor Changes

- f2183886: adds optimisticUpdates to @dopt/javascript and unifies optimisticUpdates behavior across react and JS sdks to only work with step blocks

## 1.1.10

### Patch Changes

- ce2ac3f4: clean up type names and add JS / TS doc strings to create better typedocs for @dopt/react and @dopt/javascript packages
- Updated dependencies [ce2ac3f4]
  - @dopt/javascript-common@1.2.8
  - @dopt/block-types@2.0.4
  - @dopt/mercator@1.0.2
  - @dopt/logger@0.0.3

## 1.1.9

### Patch Changes

- Updated dependencies [4661f731]
  - @dopt/block-types@2.0.3
  - @dopt/javascript-common@1.2.7

## 1.1.8

### Patch Changes

- 67d27325: improves typedoc functionality by adding better type definitions, renaming certain internal type aliases, adding type reflection into typedocs, and unifying typedoc generation into @docs/app
- Updated dependencies [67d27325]
  - @dopt/block-types@2.0.2
  - @dopt/mercator@1.0.1
  - @dopt/logger@0.0.2
  - @dopt/javascript-common@1.2.6

## 1.1.7

### Patch Changes

- Updated dependencies [d02315ba]
  - @dopt/block-types@2.0.1
  - @dopt/javascript-common@1.2.5

## 1.1.6

### Patch Changes

- b0dedccb: added `getField` accessor to react SDK -- no backward compatibility breaking changes.

## 1.1.5

### Patch Changes

- Updated dependencies [4478f0a5]
  - @dopt/block-types@2.0.0
  - @dopt/javascript-common@1.2.4

## 1.1.4

### Patch Changes

- Updated dependencies [a26aefdc]
  - @dopt/block-types@1.1.0
  - @dopt/javascript-common@1.2.3

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
