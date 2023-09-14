# @dopt/react-portal

## 1.1.1

### Patch Changes

- a3a2cec21: - add explicit react import
  - add eslint rules for react/react-in-jsx-scope and react/jsx-uses-react

## 1.1.0

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

## 1.0.0

### Major Changes

- 6cf837db3: export portal as non-compound component

## 0.1.0

### Minor Changes

- 8963a5c29: - remove wrapping element
  - return child element when container is null

## 0.0.2

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- 0b7a1e60c: React components export all of their UI Components as the default export for cleaner import of UI components and hooks.
- Updated dependencies [e57fc0407]
  - @dopt/react-component@0.0.2

## 0.0.1

### Patch Changes

- 4f9a8f8c1: The initial set of packages that comprise Dopt UI Components. Broken down into core packages that are framework agnostic and react specific packages. Initially we're offering three UI components, a modal, a checklist, and a tour.
- Updated dependencies [4f9a8f8c1]
  - @dopt/react-component@0.0.1
