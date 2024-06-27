export const fontFamilies = {
  inter: 'inter var',
  spaceGrotesque: 'space grotesque',
};

const sansSystemFontFamilyStack =
  '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif';

export const fonts = {
  sans: `${fontFamilies.spaceGrotesque}, ${sansSystemFontFamilyStack}`,
  sansDisplay: `${fontFamilies.spaceGrotesque}, ${sansSystemFontFamilyStack}`,
  sansText: `${fontFamilies.inter}, ${sansSystemFontFamilyStack}`,
  mono: `Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace`,
};

export const fontSizes = {
  /** 16px / 24px */
  root: {
    fontSize: '16px',
    lineHeight: '1.5rem',
  },
  /** 16px / 24px */
  base: {
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
  /** 12px / 16px */
  xs: {
    fontSize: '0.75rem',
    lineHeight: '1rem',
  },
  /** 14px / 20px */
  sm: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
  /** 18px / 28px */
  md: {
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
  },
  /** 22px / 32px */
  lg: {
    fontSize: '1.375rem',
    lineHeight: '2rem',
  },
  /** 28px / 40px */
  xl: {
    fontSize: '1.75rem',
    lineHeight: '2.5rem',
  },
  /** 36px / 52px */
  '2xl': {
    fontSize: '2.25rem',
    lineHeight: '3.25rem',
  },
  /** 64px / 84px */
  '3xl': {
    fontSize: '4rem',
    lineHeight: '5.25rem',
  },
};

export const fontWeights = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
  extraBlack: '950',
};
