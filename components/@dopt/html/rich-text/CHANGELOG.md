# @dopt/html-rich-text

## 0.2.0

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

## 0.1.0

### Minor Changes

- e8e8049bb: Changes style and class packaging patterns for @dopt/_-theme and @dopt/_-rich-text. First, all shared styles are moved into the @dopt/core-_ packages. Second, all shared styles are imported in the @dopt/react-_ packages and not re-imported in further downstream packages like @dopt/react-card, @dopt/react-tour, etc. Third, styles which are exposed are greatly simplified in tha t @dopt/react-_ packages no longer export their styles. If you'd like to see these styles, you can visit the @dopt/core-_ packages. Finally, some minor refactoring is done in @dopt/core-theme and @dopt/core-rich-text to enable a @dopt/html-rich-text renderer which takes Dopt's RichText object and produces an HTML string.

### Patch Changes

- Updated dependencies [e8e8049bb]
  - @dopt/core-rich-text@2.1.0
