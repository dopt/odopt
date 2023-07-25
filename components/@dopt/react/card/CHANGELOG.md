# @dopt/react-card

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

- 3d6534705: Release the 1.0.0 of the card component SDKs.

### Patch Changes

- Updated dependencies [6cf837db3]
- Updated dependencies [3d6534705]
- Updated dependencies [6cf837db3]
  - @dopt/react-rich-text@2.0.0
  - @dopt/react-theme@1.0.0
  - @dopt/semantic-data-layer-card@1.0.0
