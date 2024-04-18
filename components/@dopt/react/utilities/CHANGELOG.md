# @dopt/react-utilities

## 7.0.1

### Patch Changes

- Updated dependencies [14582c5db]
  - @dopt/react@4.2.1

## 7.0.0

### Patch Changes

- Updated dependencies [33edbe1f1]
  - @dopt/react@4.2.0

## 6.0.3

### Patch Changes

- @dopt/react@4.1.3

## 6.0.2

### Patch Changes

- Updated dependencies [dec67720c]
  - @dopt/react@4.1.2

## 6.0.1

### Patch Changes

- @dopt/react@4.1.1

## 6.0.0

### Patch Changes

- Updated dependencies [5a072a2c2]
  - @dopt/react@4.1.0

## 5.0.0

### Patch Changes

- Updated dependencies [798085827]
  - @dopt/react@4.0.0

## 4.0.5

### Patch Changes

- @dopt/react@3.3.5

## 4.0.4

### Patch Changes

- @dopt/react@3.3.4

## 4.0.3

### Patch Changes

- a3a2cec21: - add explicit react import
  - add eslint rules for react/react-in-jsx-scope and react/jsx-uses-react
- Updated dependencies [a3a2cec21]
  - @dopt/react@3.3.3

## 4.0.2

### Patch Changes

- @dopt/react@3.3.2

## 4.0.1

### Patch Changes

- Updated dependencies [c01bd5a8b]
  - @dopt/react@3.3.1

## 4.0.0

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
  - @dopt/react@3.3.0

## 3.0.2

### Patch Changes

- @dopt/react@3.2.2

## 3.0.1

### Patch Changes

- @dopt/react@3.2.1

## 3.0.0

### Patch Changes

- Updated dependencies [9d4037411]
  - @dopt/react@3.2.0

## 2.0.1

### Patch Changes

- @dopt/react@3.1.1

## 2.0.0

### Patch Changes

- Updated dependencies [e18bb04b4]
  - @dopt/react@3.1.0

## 1.0.7

### Patch Changes

- @dopt/react@3.0.7

## 1.0.6

### Patch Changes

- Updated dependencies [58ec892d7]
  - @dopt/react@3.0.6

## 1.0.5

### Patch Changes

- @dopt/react@3.0.5

## 1.0.4

### Patch Changes

- @dopt/react@3.0.4

## 1.0.3

### Patch Changes

- @dopt/react@3.0.3

## 1.0.2

### Patch Changes

- @dopt/react@3.0.2

## 1.0.1

### Patch Changes

- e57fc0407: Update README.md and package.json to improve npm registry.
- Updated dependencies [e57fc0407]
  - @dopt/react@3.0.1

## 1.0.0

### Patch Changes

- 4f9a8f8c1: The initial set of packages that comprise Dopt UI Components. Broken down into core packages that are framework agnostic and react specific packages. Initially we're offering three UI components, a modal, a checklist, and a tour.
- Updated dependencies [d6732a3b4]
- Updated dependencies [856005780]
  - @dopt/react@3.0.0

## 1.0.0

### Patch Changes

- Updated dependencies [6200ee8ea]
  - @dopt/react@2.1.0
