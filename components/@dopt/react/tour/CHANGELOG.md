# @dopt/react-tour

## 4.0.2

### Patch Changes

- @dopt/react@3.0.7
- @dopt/react-rich-text@3.0.1
- @dopt/react-utilities@1.0.7

## 4.0.1

### Patch Changes

- 04e2595f5: set correct types on progress props
- 0750b62c6: fix usage example

## 4.0.0

### Major Changes

- 819a456d7: export styles at ./styles.css rather than ./styles

### Patch Changes

- 623a7b32c: update readme
- 58ec892d7: configure .tsx linting in @dopt/config and lint and update all packages which surface linting errors.
- Updated dependencies [623a7b32c]
- Updated dependencies [819a456d7]
- Updated dependencies [819a456d7]
- Updated dependencies [58ec892d7]
  - @dopt/react-rich-text@3.0.0
  - @dopt/react-theme@1.0.1
  - @dopt/core-rich-text@1.0.1
  - @dopt/react@3.0.6
  - @dopt/semantic-data-layer-tour@0.0.6
  - @dopt/react-portal@1.0.0
  - @dopt/react-utilities@1.0.6

## 3.0.0

### Major Changes

- cfba4ee5f: unravel component props from default export

### Patch Changes

- @dopt/react@3.0.5
- @dopt/react-rich-text@2.0.1
- @dopt/react-utilities@1.0.5

## 2.0.0

### Major Changes

- 6cf837db3: #### Migrate styling and theming to vanilla-extract

  Our original styling system was built off of [Stitches](https://stitches.dev/) which is [no longer actively maintained](https://github.com/stitchesjs/stitches/discussions/1149). With the industry moving more towards zero-runtime styling tools, we decided to use [vanilla-extract](https://vanilla-extract.style/) to build out our new styling and theming system for Dopt-powered components.

  This migration should help with the component bundle size as well as rendering performance. Themes can still be defined and overridden at runtime.

  ##### Theme definition

  Themes can still be defined and overridden via CSS, but the JS API has changed. To create a theme:

  ```js
  import { createTheme } from '@dopt/react-theme';

  const customTheme = createTheme({
    colors: {
      primary: '#b4d455',
    },
    fonts: {
      sans: 'Inter, sans-serif',
    },
  });
  ```

  Themes are now constrained to the `Theme` type which provides a strict interface to valid token types.

  ##### Theme usage

  Using themes follows the same API as before by passing in the theme definition to the component's `theme` prop.

  ```jsx
  import Modal from '@dopt/react-modal';

  function App() {
    return <Modal.Root theme={customTheme}>...</Modal.Root>;
  }
  ```

  However, note that the theme definition no longer produces a scoped class, but a string literal of CSS variables.

  ##### Static CSS exports

  Modern bundlers should handle importing CSS out of the box, but if there is a need to reference the static CSS, you can do so via the `@dopt/react-$component/styles` export path. Additionally, the static CSS for the default theme is exported by `@dopt/core-theme/styles`.

  For instance, importing the static CSS for `@dopt/react-modal` would look like this:

  ```js
  import '@dopt/react-modal/styles';
  ```

### Patch Changes

- Updated dependencies [6cf837db3]
- Updated dependencies [6cf837db3]
- Updated dependencies [6cf837db3]
  - @dopt/react-rich-text@2.0.0
  - @dopt/react-theme@1.0.0
  - @dopt/react-portal@1.0.0

## 1.0.7

### Patch Changes

- Updated dependencies [80cd31924]
- Updated dependencies [80cd31924]
  - @dopt/core-rich-text@1.0.0
  - @dopt/react-rich-text@1.1.0
  - @dopt/semantic-data-layer-tour@0.0.5
  - @dopt/react@3.0.4
  - @dopt/react-utilities@1.0.4

## 1.0.6

### Patch Changes

- Updated dependencies [0cab59fd1]
  - @dopt/react-rich-text@1.0.5
  - @dopt/core-rich-text@0.0.4
  - @dopt/semantic-data-layer-tour@0.0.4
  - @dopt/react@3.0.3
  - @dopt/react-utilities@1.0.3

## 1.0.5

### Patch Changes

- Updated dependencies [8963a5c29]
  - @dopt/react-portal@0.1.0

## 1.0.4

### Patch Changes

- Updated dependencies [ea44007e8]
  - @dopt/react-rich-text@1.0.4
  - @dopt/core-rich-text@0.0.3
  - @dopt/semantic-data-layer-tour@0.0.3
  - @dopt/react@3.0.2
  - @dopt/react-utilities@1.0.2

## 1.0.3

### Patch Changes

- ff2a803fc: update README.md and package.json and add new links and usage patterns
- 36c73ceb9: update readme
- Updated dependencies [b702ab075]
  - @dopt/react-theme@0.0.2
  - @dopt/react-rich-text@1.0.3

## 1.0.2

### Patch Changes

- 0b7a1e60c: React components export all of their UI Components as the default export for cleaner import of UI components and hooks.
- Updated dependencies [e57fc0407]
- Updated dependencies [0b7a1e60c]
- Updated dependencies [bcc6cb36f]
  - @dopt/semantic-data-layer-tour@0.0.2
  - @dopt/react-component@0.0.2
  - @dopt/react-utilities@1.0.1
  - @dopt/react@3.0.1
  - @dopt/react-portal@0.0.2
  - @dopt/react-rich-text@1.0.2
  - @dopt/core-rich-text@0.0.2

## 1.0.1

### Patch Changes

- 2699499c0: Add tour progress component.
- Updated dependencies [d5141cc68]
  - @dopt/react-rich-text@1.0.1

## 1.0.0

### Patch Changes

- 4f9a8f8c1: The initial set of packages that comprise Dopt UI Components. Broken down into core packages that are framework agnostic and react specific packages. Initially we're offering three UI components, a modal, a checklist, and a tour.
- Updated dependencies [d6732a3b4]
- Updated dependencies [d6732a3b4]
- Updated dependencies [856005780]
- Updated dependencies [4f9a8f8c1]
  - @dopt/react@3.0.0
  - @dopt/semantic-data-layer-tour@0.0.1
  - @dopt/react-component@0.0.1
  - @dopt/react-rich-text@1.0.0
  - @dopt/react-utilities@1.0.0
  - @dopt/core-rich-text@0.0.1
  - @dopt/react-portal@0.0.1
  - @dopt/react-theme@0.0.1

## 1.0.0

### Patch Changes

- Updated dependencies [6200ee8ea]
  - @dopt/react@2.1.0
  - @dopt/react-utilities@1.0.0
