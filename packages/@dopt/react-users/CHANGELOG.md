# @dopt/react-users

## 0.1.1

### Patch Changes

- @dopt/users-javascript-browser-client@1.0.6

## 0.1.0

### Minor Changes

- 4436d4f1d: Simplifies signatures of `useIdentifyUser` and `useIdentifyGroup` to only accept request bodies for their respective API calls. Additionally, by hook parameters, it also simplifies useEffect request caching within `useIdentifyUser` and `useIdentifyGroup` hooks. Previously, users would be identified multiple times despite their request bodies not changing. This was not a severe bug since multiple equivalent identifications are idempotent in Dopt's users API, but this update removes the unnecessary identifications.

## 0.0.1

### Patch Changes

- 2e7079e55: Create a package of Dopt-specific users API hooks in React for identifying users and groups to Dopt.
