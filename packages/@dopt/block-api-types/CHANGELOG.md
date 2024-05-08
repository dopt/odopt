# @dopt/block-api-types

## 1.3.4

### Patch Changes

- Updated dependencies [f9db1d0dd]
  - @userstate/types@4.4.0

## 1.3.3

### Patch Changes

- Updated dependencies [04492fca2]
  - @userstate/types@4.3.2

## 1.3.2

### Patch Changes

- eaf9872d3: Update package version.

## 1.3.1

### Patch Changes

- @userstate/types@4.3.1

## 1.3.0

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
  - @userstate/types@4.3.0

## 1.2.2

### Patch Changes

- @userstate/types@4.2.2

## 1.2.1

### Patch Changes

- @userstate/types@4.2.1

## 1.2.0

### Minor Changes

- 28d6d277a: Create "uncommitted" and "latest" tags for accessing the draft (0) and latest versions. These tags will be exposed through an optional query parameter in @blocks/api for all the flows APIs. Because tags can now be specified, the version query parameter is made optional. As of this change, these tags are only accessible through the API (or clients). A follow up change will expose these tags in the SDK providers.

## 1.1.7

### Patch Changes

- Updated dependencies [cb25c6b04]
  - @userstate/types@4.2.0

## 1.1.6

### Patch Changes

- @userstate/types@4.1.6

## 1.1.5

### Patch Changes

- Updated dependencies [b65abb9ba]
  - @userstate/types@4.1.5

## 1.1.4

### Patch Changes

- @userstate/types@4.1.4

## 1.1.3

### Patch Changes

- @userstate/types@4.1.3

## 1.1.2

### Patch Changes

- @userstate/types@4.1.2

## 1.1.1

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [e57fc0407]
  - @userstate/types@4.1.1

## 1.1.0

### Minor Changes

- 856005780: Exposes RichText as a top level field type. This additive change allows for RichText objects to be returned by the blocks API and to be consumed and surfaced via the Blocks client, and React and Javascript SDKs.

### Patch Changes

- Updated dependencies [856005780]
  - @userstate/types@4.1.0

## 1.0.0

### Major Changes

- 60df5938: These packages have all been updated as a part of Dopt's v2.0.0 major launch. To read the relevant changelogs, see @dopt/react or @dopt/javascript if you're using the react or javascript SDKs. If you're using the blocks client, see the changelog for @dopt/blocks-javascript-client.

### Patch Changes

- Updated dependencies [60df5938]
  - @userstate/types@4.0.0

## 0.2.0

### Minor Changes

- 518336dd: add support for multiple transitions

### Patch Changes

- Updated dependencies [518336dd]
  - @userstate/types@3.2.0

## 0.1.0

### Minor Changes

- ae86c132: update name of flow intents and flow type for v2

### Patch Changes

- Updated dependencies [ae86c132]
  - @userstate/types@3.1.0

## 0.0.1

### Patch Changes

- bcd09f0e: Scaffold out package that can encode a shared defintion of types used in the Block API.
