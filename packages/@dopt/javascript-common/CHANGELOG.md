# @dopt/javascript-common

## 2.3.5

### Patch Changes

- @dopt/block-api-types@1.3.3

## 2.3.4

### Patch Changes

- Updated dependencies [eaf9872d3]
  - @dopt/block-api-types@1.3.2

## 2.3.3

### Patch Changes

- 0dcb8f37f: Ensure query parameters sent over the socket are encoded correctly

## 2.3.2

### Patch Changes

- @dopt/block-api-types@1.3.1

## 2.3.1

### Patch Changes

- Updated dependencies [1f5499ee6]
  - @dopt/logger@0.2.0

## 2.3.0

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
  - @dopt/block-api-types@1.3.0
  - @dopt/logger@0.1.0

## 2.2.2

### Patch Changes

- @dopt/block-api-types@1.2.2

## 2.2.1

### Patch Changes

- @dopt/block-api-types@1.2.1

## 2.2.0

### Minor Changes

- 9d4037411: @dopt/javascript-common's API client now supports specifying "uncommitted" and "latest" as tags for a flow version when calling `GET` or `POST` on the flow. This update to the API client is also wired through @dopt/javascript and @dopt/react so users can specify those flow tags when initializing the packages. READMEs are also updated for both packages.

## 2.1.1

### Patch Changes

- Updated dependencies [28d6d277a]
  - @dopt/block-api-types@1.2.0

## 2.1.0

### Minor Changes

- e18bb04b4: Add force? options to @dopt/react and @dopt/javascript SDKs. This introduces functionality keeping the SDKs in line with our APIs and clients. When `force: true` is passed into the `start` or `reset` functions from `useFlow` and `Flow` respectively, those intents will forcefully start the flow. This means that they will start the flow despite any targeting or entry conditions. Otherwise, the intents will only start the flow if those conditions are met.

## 2.0.9

### Patch Changes

- @dopt/block-api-types@1.1.7

## 2.0.8

### Patch Changes

- @dopt/block-api-types@1.1.6
- @dopt/logger@0.0.3

## 2.0.7

### Patch Changes

- @dopt/block-api-types@1.1.5

## 2.0.6

### Patch Changes

- @dopt/block-api-types@1.1.4

## 2.0.5

### Patch Changes

- @dopt/block-api-types@1.1.3

## 2.0.4

### Patch Changes

- @dopt/block-api-types@1.1.2

## 2.0.3

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [e57fc0407]
  - @dopt/block-api-types@1.1.1

## 2.0.2

### Patch Changes

- Updated dependencies [856005780]
  - @dopt/block-api-types@1.1.0

## 2.0.1

### Patch Changes

- aba3913d6: Update @dopt/react to disconnect and reconnect sockets when the document's visibility changes (i.e. the page is backgrounded). When the page is foregrounded again, make sure to fetch the appropriate flows to synchronize states. Lastly, make sure to turn off sockets in addition to closing them when sockets are initialized or when events are added. This ensures that we don't leak socket connections or trigger invalid handlers. Also, add an optionally configurable backgroundTimeout property which lets users configure how they'd like to debounce the page backgrounding / foregrounding. This defaults to 60 seconds.

  Update @dopt/javascript-common to provide an appropriate log message when the client disconnects manually (today, this is only done in @dopt/react).

## 2.0.0

### Major Changes

- 60df5938: These packages have all been updated as a part of Dopt's v2.0.0 major launch. To read the relevant changelogs, see @dopt/react or @dopt/javascript if you're using the react or javascript SDKs. If you're using the blocks client, see the changelog for @dopt/blocks-javascript-client.

### Patch Changes

- Updated dependencies [60df5938]
  - @dopt/block-api-types@1.0.0

## 1.4.5

### Patch Changes

- 3398b437: adding group update support on sockets

## 1.4.4

### Patch Changes

- Updated dependencies [2191b727]
  - @dopt/block-types@3.0.1

## 1.4.3

### Patch Changes

- 7d57b37e: add support for sid. and still support uids

## 1.4.2

### Patch Changes

- 7440d099: moves type definitions from common library into the respective places in which they're used; removes unused type definitions; cleans up typedocs; makes sure that all @dopt/react intents do not return values

## 1.4.1

### Patch Changes

- d632e58e: Remove the dependency on @dopt/const package.

## 1.4.0

### Minor Changes

- ef9377e2: update javascript-common package to process intent header and add hooks into react package which allows consumers to track Dopt provider initialization and flow level initialization

## 1.3.0

### Minor Changes

- e619b78e: support new sid requirement on getDefaultBlock

### Patch Changes

- Updated dependencies [e619b78e]
  - @dopt/block-types@3.0.0

## 1.2.8

### Patch Changes

- ce2ac3f4: clean up type names and add JS / TS doc strings to create better typedocs for @dopt/react and @dopt/javascript packages
- Updated dependencies [ce2ac3f4]
  - @dopt/block-types@2.0.4
  - @dopt/mercator@1.0.2
  - @dopt/logger@0.0.3

## 1.2.7

### Patch Changes

- Updated dependencies [4661f731]
  - @dopt/block-types@2.0.3

## 1.2.6

### Patch Changes

- Updated dependencies [67d27325]
  - @dopt/block-types@2.0.2
  - @dopt/mercator@1.0.1
  - @dopt/logger@0.0.2

## 1.2.5

### Patch Changes

- Updated dependencies [d02315ba]
  - @dopt/block-types@2.0.1

## 1.2.4

### Patch Changes

- Updated dependencies [4478f0a5]
  - @dopt/block-types@2.0.0

## 1.2.3

### Patch Changes

- Updated dependencies [a26aefdc]
  - @dopt/block-types@1.1.0

## 1.2.2

### Patch Changes

- Updated dependencies [874b0427]
- Updated dependencies [b3fba687]
  - @dopt/block-types@1.0.3

## 1.2.1

### Patch Changes

- Updated dependencies [f636dd8b]
  - @dopt/block-types@1.0.2

## 1.2.0

### Minor Changes

- 850b6fe7: update optimisticUpdates parameter, clarifying what it does and where to use it

## 1.1.0

### Minor Changes

- a78cce92: fixes issues with state access and updates for model blocks within set blocks; adds scaffolding to retrieve field values
