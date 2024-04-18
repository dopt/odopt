# @dopt/react-users

## 0.2.8

### Patch Changes

- Updated dependencies [14582c5db]
  - @dopt/users-javascript-client@0.1.1

## 0.2.7

### Patch Changes

- Updated dependencies [78ed01b9a]
  - @dopt/users-javascript-client@0.1.0

## 0.2.6

### Patch Changes

- 6a55efb5b: add typedocs for DoptUsersProvider

## 0.2.5

### Patch Changes

- @dopt/users-javascript-client@1.1.2

## 0.2.4

### Patch Changes

- @dopt/users-javascript-client@1.1.1

## 0.2.3

### Patch Changes

- a3a2cec21: - add explicit react import
  - add eslint rules for react/react-in-jsx-scope and react/jsx-uses-react

## 0.2.2

### Patch Changes

- Updated dependencies [bf06071dc]
  - @dopt/users-javascript-client@1.1.0

## 0.2.1

### Patch Changes

- @dopt/users-javascript-client@1.0.7

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

## 0.1.1

### Patch Changes

- @dopt/users-javascript-client@1.0.6

## 0.1.0

### Minor Changes

- 4436d4f1d: Simplifies signatures of `useIdentifyUser` and `useIdentifyGroup` to only accept request bodies for their respective API calls. Additionally, by hook parameters, it also simplifies useEffect request caching within `useIdentifyUser` and `useIdentifyGroup` hooks. Previously, users would be identified multiple times despite their request bodies not changing. This was not a severe bug since multiple equivalent identifications are idempotent in Dopt's users API, but this update removes the unnecessary identifications.

## 0.0.1

### Patch Changes

- 2e7079e55: Create a package of Dopt-specific users API hooks in React for identifying users and groups to Dopt.
