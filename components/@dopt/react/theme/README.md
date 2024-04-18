# @dopt/react-theme

Dopt's React components leverage a unified theme which consists of tokens for things like colors, typography, and spacing. You can override or extend these tokens as you go about styling the components. Leveraging a theme can be useful for quickly styling multiple components at the same time so they all feel cohesive.

All of Dopt's React components have a `theme` prop that you can use to pass in your custom theme definition.

[Learn more about Dopt's styling and theming →](https://docs.dopt.com/components/react/styling/).

## Installation

```bash
# npm
npm install @dopt/react-theme

# Yarn
yarn add @dopt/react-theme

# pnpm
pnpm add @dopt/react-theme
```

## Usage

```jsx
import { createTheme } from '@dopt/react-theme';
import Modal from '@dopt/react-modal';

const customTheme = createTheme({
  colors: {
    primary: '#b4d455',
  },
  fonts: {
    sans: 'Inter, sans-serif',
  },
});

function MyModal() {
  return <Modal.Root theme={customTheme}>...</Modal.Root>;
}
```

## Theme interface

When defining a custom theme, you will need adhere to a strict interface that maps to specific [theme tokens](https://docs.dopt.com/components/react/tokens/) as defined in [@dopt/core-theme](https://www.npmjs.com/package/@dopt/core-theme).

```ts
interface Theme {
  colors?: {
    black?: string;
    white?: string;
    primary?: string;
    primaryLight?: string;
    primaryDark?: string;
    secondary?: string;
    secondaryLight?: string;
    secondaryDark?: string;
    content?: string;
    contentLight?: string;
    contentContrast?: string;
    border?: string;
    overlay?: string;
    background?: string;
  };
  space?: {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
    9?: string;
    10?: string;
    12?: string;
    16?: string;
  };
  sizes?: {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
    9?: string;
    10?: string;
    12?: string;
    16?: string;
  };
  radii?: {
    1?: string;
    2?: string;
    round?: string;
  };
  shadows?: {
    1?: string;
    2?: string;
  };
  fonts?: {
    sans?: string;
    mono?: string;
  };
  fontSizes?: {
    base?: string;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  fontWeights?: {
    normal?: string;
    medium?: string;
    bold?: string;
  };
  lineHeights?: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
  borderWidths?: {
    1?: string;
    2?: string;
  };
  transitions?: {
    linear?: string;
    linearFast?: string;
    ease?: string;
    easeFast?: string;
  };
}
```
