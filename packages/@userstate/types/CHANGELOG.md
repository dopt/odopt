# @dopt/block-types

## 4.3.2

### Patch Changes

- 04492fca2: Update `boolean.expression` in `@userstate/types` to accept blocks. This enables boolean expressions to respond to block state changes.

## 4.3.1

### Patch Changes

- Updated dependencies [5815a3783]
  - @dopt/core-rich-text@2.3.0

## 4.3.0

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

## 4.2.2

### Patch Changes

- Updated dependencies [e8e8049bb]
  - @dopt/core-rich-text@2.1.0

## 4.2.1

### Patch Changes

- Updated dependencies [eee149c59]
  - @dopt/core-rich-text@2.0.0

## 4.2.0

### Minor Changes

- cb25c6b04: Add optional force parameters to `/v2/flow/:id:/start` and `/v2/flow/:id/reset` endpoints. If this parameter is set to true in the querystring of the request, then then the flow will always be started despite any entry conditions for the flow. This allows developers to override and forcefully start a flow (or reset a flow) from the API. This change will also subsequently be included in the React and JS SDKs.

## 4.1.6

### Patch Changes

- Updated dependencies [623a7b32c]
  - @dopt/core-rich-text@1.0.1

## 4.1.5

### Patch Changes

- b65abb9ba: sentence case display names

## 4.1.4

### Patch Changes

- Updated dependencies [80cd31924]
  - @dopt/core-rich-text@1.0.0

## 4.1.3

### Patch Changes

- Updated dependencies [0cab59fd1]
  - @dopt/core-rich-text@0.0.4

## 4.1.2

### Patch Changes

- Updated dependencies [ea44007e8]
  - @dopt/core-rich-text@0.0.3

## 4.1.1

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [bcc6cb36f]
  - @dopt/core-rich-text@0.0.2

## 4.1.0

### Minor Changes

- 856005780: Exposes RichText as a top level field type. This additive change allows for RichText objects to be returned by the blocks API and to be consumed and surfaced via the Blocks client, and React and Javascript SDKs.

### Patch Changes

- Updated dependencies [4f9a8f8c1]
  - @dopt/core-rich-text@0.0.1

## 4.0.0

### Major Changes

- 60df5938: These packages have all been updated as a part of Dopt's v2.0.0 major launch. To read the relevant changelogs, see @dopt/react or @dopt/javascript if you're using the react or javascript SDKs. If you're using the blocks client, see the changelog for @dopt/blocks-javascript-client.

## 3.2.0

### Minor Changes

- 518336dd: add support for multiple transitions

## 3.1.0

### Minor Changes

- ae86c132: update name of flow intents and flow type for v2

## 3.0.0

### Major Changes

- e619b78e: added sid support

## 2.0.4

### Patch Changes

- ce2ac3f4: clean up type names and add JS / TS doc strings to create better typedocs for @dopt/react and @dopt/javascript packages

## 2.0.3

### Patch Changes

- 4661f731: Adding readme

## 2.0.2

### Patch Changes

- 67d27325: improves typedoc functionality by adding better type definitions, renaming certain internal type aliases, adding type reflection into typedocs, and unifying typedoc generation into @docs/app

## 2.0.1

### Patch Changes

- d02315ba: Adding refs to help blocks-javascript-client

## 2.0.0

### Major Changes

- 4478f0a5: refactored integer to number for fields

## 1.1.0

### Minor Changes

- a26aefdc: added webhook blocks

## 1.0.3

### Patch Changes

- 874b0427: typo in block fields error
- b3fba687: Adding alias Group to Set type

## 1.0.2

### Patch Changes

- f636dd8b: Introducing the blocks-javascript-client
