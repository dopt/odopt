import { interFontFamily, vctrmonoFontFamily } from '@bodo/font';

export const fonts = {
  sans: `${interFontFamily}, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif`,
  mono: `${vctrmonoFontFamily}, Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace`,
};

export const fontSizes = {
  base: {
    fontSize: '16px',
    lineHeight: '24px',
  },
  xs: {
    fontSize: '12px',
    lineHeight: '16px',
  },
  sm: {
    fontSize: '14px',
    lineHeight: '20px',
  },
  md: {
    fontSize: '18px',
    lineHeight: '28px',
  },
  lg: {
    fontSize: '22px',
    lineHeight: '32px',
  },
  xl: {
    fontSize: '28px',
    lineHeight: '40px',
  },
  '2xl': {
    fontSize: '36px',
    lineHeight: '52px',
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
