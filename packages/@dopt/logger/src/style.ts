import { colors as tokens } from './color';
import chalk, { type ChalkFunction } from 'chalk';

const colors = tokens.light;

const commonBrowserStyles = {
  'font-family': 'system-ui',
  'padding-top': '1px',
  'padding-bottom': '2px',
  'font-size': '13',
  'border-radius': '2px',
  'font-weight': '600',
  'letter-spacing': '2px',
  color: 'white',
};
export const nodeStyle: Record<string, ChalkFunction> = {
  prefix: chalk.bold.white.bgHex(colors.blurple500),
  debugTitle: chalk.bold.white.bgHex(colors.ultramarine500),
  errorTitle: chalk.bold.white.bgHex(colors.burntOrange500),
  errorBody: chalk.hex(colors.burntOrange500),
  warnTitle: chalk.bold.hex(colors.midnight500).bgHex(colors.sunGlow500),
  infoTitle: chalk.bold.hex(colors.midnight500).bgHex(colors.sky500),
};

export const browserStyle: Record<string, () => string> = {
  default: browserStyles({
    ...commonBrowserStyles,
  }),
  prefix: browserStyles({
    ...commonBrowserStyles,
    background: colors.blurple500,
  }),
  debugTitle: browserStyles({
    ...commonBrowserStyles,
    background: colors.ultramarine500,
  }),
  errorTitle: browserStyles({
    ...commonBrowserStyles,
    background: colors.burntOrange500,
  }),
  errorBody: browserStyles({
    color: colors.burntOrange500,
  }),
  warnTitle: browserStyles({
    ...commonBrowserStyles,
    background: colors.sunGlow500,
    color: colors.midnight500,
  }),
  infoTitle: browserStyles({
    ...commonBrowserStyles,
    background: colors.sky500,
    color: colors.midnight500,
  }),
};

function browserStyles(css: string | Record<string, unknown>) {
  let cssString = '';
  if (typeof css == 'string') {
    cssString = 'color:' + css;
  } else {
    for (const key in css) {
      cssString = cssString + key + ':' + css[key] + ';';
    }
  }
  return () => cssString;
}
