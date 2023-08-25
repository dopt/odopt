# @dopt/react-theme

## 1.1.0

### Minor Changes

- e8e8049bb: Changes style and class packaging patterns for @dopt/_-theme and @dopt/_-rich-text. First, all shared styles are moved into the @dopt/core-_ packages. Second, all shared styles are imported in the @dopt/react-_ packages and not re-imported in further downstream packages like @dopt/react-card, @dopt/react-tour, etc. Third, styles which are exposed are greatly simplified in tha t @dopt/react-_ packages no longer export their styles. If you'd like to see these styles, you can visit the @dopt/core-_ packages. Finally, some minor refactoring is done in @dopt/core-theme and @dopt/core-rich-text to enable a @dopt/html-rich-text renderer which takes Dopt's RichText object and produces an HTML string.

## 1.0.2

### Patch Changes

- ea0653a7b: add typeVersions definition for styles export

## 1.0.1

### Patch Changes

- 623a7b32c: update readme
- 819a456d7: update core-theme style import
- Updated dependencies [623a7b32c]
- Updated dependencies [819a456d7]
  - @dopt/core-theme@2.0.0

## 1.0.0

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
  - @dopt/core-theme@1.0.0

## 0.0.2

### Patch Changes

- b702ab075: Update README.md, package.json, and code blocks for themes and styles packages
- Updated dependencies [b702ab075]
  - @dopt/core-theme@0.0.2

## 0.0.1

### Patch Changes

- 4f9a8f8c1: The initial set of packages that comprise Dopt UI Components. Broken down into core packages that are framework agnostic and react specific packages. Initially we're offering three UI components, a modal, a checklist, and a tour.
- Updated dependencies [4f9a8f8c1]
  - @dopt/core-theme@0.0.1
