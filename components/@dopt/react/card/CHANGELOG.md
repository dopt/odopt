# @dopt/react-card

## 10.0.2

### Patch Changes

- Updated dependencies [a4209f4df]
  - @dopt/react@5.0.2
  - @dopt/semantic-data-layer-card@1.2.3

## 10.0.1

### Patch Changes

- Updated dependencies [00764ba3e]
  - @dopt/react@5.0.1

## 10.0.0

### Patch Changes

- Updated dependencies [a6cfcb0fa]
- Updated dependencies [e027a3980]
- Updated dependencies [b1aa72063]
  - @dopt/react@5.0.0

## 9.0.1

### Patch Changes

- Updated dependencies [14582c5db]
  - @dopt/react@4.2.1
  - @dopt/react-theme@1.2.4

## 9.0.0

### Patch Changes

- Updated dependencies [33edbe1f1]
  - @dopt/react@4.2.0

## 8.0.5

### Patch Changes

- @dopt/semantic-data-layer-card@1.2.2
- @dopt/react@4.1.3

## 8.0.4

### Patch Changes

- Updated dependencies [dec67720c]
  - @dopt/react@4.1.2

## 8.0.3

### Patch Changes

- @dopt/react-theme@1.2.3

## 8.0.2

### Patch Changes

- @dopt/react-theme@1.2.2

## 8.0.1

### Patch Changes

- @dopt/semantic-data-layer-card@1.2.1
- @dopt/react@4.1.1

## 8.0.0

### Patch Changes

- Updated dependencies [5a072a2c2]
  - @dopt/react@4.1.0

## 7.1.0

### Minor Changes

- d3480408d: expose field accessor for component blocks and their children

### Patch Changes

- 4791a1080: reduce content padding
- Updated dependencies [d3480408d]
  - @dopt/semantic-data-layer-card@1.2.0

## 7.0.1

### Patch Changes

- e9e1b01f8: update README
- Updated dependencies [e9e1b01f8]
  - @dopt/react-rich-text@6.0.1

## 7.0.0

### Patch Changes

- Updated dependencies [798085827]
  - @dopt/react@4.0.0

## 6.0.5

### Patch Changes

- @dopt/react@3.3.5

## 6.0.4

### Patch Changes

- Updated dependencies [5815a3783]
- Updated dependencies [5815a3783]
  - @dopt/core-rich-text@2.3.0
  - @dopt/react-rich-text@6.0.0
  - @dopt/semantic-data-layer-card@1.1.1
  - @dopt/react@3.3.4

## 6.0.3

### Patch Changes

- a3a2cec21: - add explicit react import
  - add eslint rules for react/react-in-jsx-scope and react/jsx-uses-react
- 62277a005: remove @dopt/react-component dependency
- Updated dependencies [a3a2cec21]
  - @dopt/react-rich-text@5.2.3
  - @dopt/react-theme@1.2.1
  - @dopt/react@3.3.3
  - @dopt/core-rich-text@2.2.0
  - @dopt/semantic-data-layer-card@1.1.0

## 6.0.2

### Patch Changes

- 7461c0069: add docs for framework-specific setup
- Updated dependencies [7461c0069]
  - @dopt/react-rich-text@5.2.2
  - @dopt/react@3.3.2

## 6.0.1

### Patch Changes

- Updated dependencies [c01bd5a8b]
  - @dopt/react@3.3.1

## 6.0.0

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
  - @dopt/react-component@0.1.0
  - @dopt/react-theme@1.2.0
  - @dopt/semantic-data-layer-card@1.1.0
  - @dopt/react@3.3.0
  - @dopt/react-rich-text@5.2.1

## 5.2.0

### Minor Changes

- e8e8049bb: Changes style and class packaging patterns for @dopt/_-theme and @dopt/_-rich-text. First, all shared styles are moved into the @dopt/core-_ packages. Second, all shared styles are imported in the @dopt/react-_ packages and not re-imported in further downstream packages like @dopt/react-card, @dopt/react-tour, etc. Third, styles which are exposed are greatly simplified in tha t @dopt/react-_ packages no longer export their styles. If you'd like to see these styles, you can visit the @dopt/core-_ packages. Finally, some minor refactoring is done in @dopt/core-theme and @dopt/core-rich-text to enable a @dopt/html-rich-text renderer which takes Dopt's RichText object and produces an HTML string.

### Patch Changes

- Updated dependencies [e8e8049bb]
  - @dopt/react-rich-text@5.2.0
  - @dopt/core-rich-text@2.1.0
  - @dopt/react-theme@1.1.0
  - @dopt/semantic-data-layer-card@1.0.3
  - @dopt/react@3.2.2

## 5.1.0

### Minor Changes

- eee149c59: expose data layer types

### Patch Changes

- Updated dependencies [eee149c59]
- Updated dependencies [eee149c59]
  - @dopt/core-rich-text@2.0.0
  - @dopt/semantic-data-layer-card@1.0.2
  - @dopt/react-rich-text@5.1.0
  - @dopt/react@3.2.1

## 5.0.0

### Patch Changes

- Updated dependencies [9d4037411]
  - @dopt/react@3.2.0
  - @dopt/react-rich-text@5.0.0

## 4.0.3

### Patch Changes

- @dopt/react@3.1.1
- @dopt/react-rich-text@4.0.2

## 4.0.2

### Patch Changes

- cd75a6a13: - update @dopt/react-card readme with example links
  - fix typo in @dopt/react-checklist readme
- Updated dependencies [cdae973c7]
  - @dopt/react-rich-text@4.0.1

## 4.0.1

### Patch Changes

- 4f835c549: improve base styling

## 4.0.0

### Patch Changes

- Updated dependencies [e18bb04b4]
  - @dopt/react@3.1.0
  - @dopt/react-rich-text@4.0.0

## 3.1.0

### Minor Changes

- ea0653a7b: add standalone hooks export

### Patch Changes

- Updated dependencies [ea0653a7b]
  - @dopt/react-theme@1.0.2

## 3.0.1

### Patch Changes

- @dopt/react@3.0.7
- @dopt/react-rich-text@3.0.1

## 3.0.0

### Major Changes

- 819a456d7: export styles at ./styles.css rather than ./styles

### Patch Changes

- 623a7b32c: update readme
- Updated dependencies [623a7b32c]
- Updated dependencies [819a456d7]
- Updated dependencies [819a456d7]
- Updated dependencies [58ec892d7]
  - @dopt/react-rich-text@3.0.0
  - @dopt/react-theme@1.0.1
  - @dopt/core-rich-text@1.0.1
  - @dopt/react@3.0.6
  - @dopt/semantic-data-layer-card@1.0.1
  - @dopt/react-component@0.0.2

## 2.0.0

### Major Changes

- cfba4ee5f: unravel component props from default export

### Patch Changes

- @dopt/react@3.0.5
- @dopt/react-rich-text@2.0.1

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
