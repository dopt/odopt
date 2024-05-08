# @dopt/semantic-data-layer-tour

## 0.3.3

### Patch Changes

- @dopt/block-api-types@1.3.4

## 0.3.2

### Patch Changes

- @dopt/block-api-types@1.3.3

## 0.3.1

### Patch Changes

- Updated dependencies [eaf9872d3]
  - @dopt/block-api-types@1.3.2

## 0.3.0

### Minor Changes

- d3480408d: expose field accessor for component blocks and their children

## 0.2.1

### Patch Changes

- Updated dependencies [5815a3783]
  - @dopt/core-rich-text@2.3.0

## 0.2.0

### Minor Changes

- c01bd5a8b: Update the `TourItem` interface to allow the `tour:` attribute to be `undefined`. This more closely maps what happens when Dopt initializes in the browser. When using a `TourItem`, the item will be available with the appropriate defaults. The `Tour` that it belongs to will only become available once Dopt has loaded since this is a nested dependency.

## 0.1.0

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

## 0.0.8

### Patch Changes

- Updated dependencies [e8e8049bb]
  - @dopt/core-rich-text@2.1.0

## 0.0.7

### Patch Changes

- eee149c59: refactor rich text types
- Updated dependencies [eee149c59]
  - @dopt/core-rich-text@2.0.0

## 0.0.6

### Patch Changes

- Updated dependencies [623a7b32c]
  - @dopt/core-rich-text@1.0.1

## 0.0.5

### Patch Changes

- Updated dependencies [80cd31924]
  - @dopt/core-rich-text@1.0.0

## 0.0.4

### Patch Changes

- Updated dependencies [0cab59fd1]
  - @dopt/core-rich-text@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies [ea44007e8]
  - @dopt/core-rich-text@0.0.3

## 0.0.2

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [bcc6cb36f]
  - @dopt/core-rich-text@0.0.2

## 0.0.1

### Patch Changes

- d6732a3b4: All semantic data layer packages must now accept undefined as a possible value when fields are used to power attributes, i.e. the `title` value can now be `string | null | undefined`. See changes in @dopt/react for more context.
- Updated dependencies [4f9a8f8c1]
  - @dopt/core-rich-text@0.0.1
