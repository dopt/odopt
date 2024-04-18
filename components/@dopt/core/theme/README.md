# @dopt/core-theme

This package contains Dopt's core themes and related utilities used for styling across Dopt's React component libraries via [@dopt/react-theme](https://www.npmjs.com/package/@dopt/react-theme).

[Learn more about Dopt's styling and theming →](https://docs.dopt.com/components/react/styling/).

## Theme interface

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
