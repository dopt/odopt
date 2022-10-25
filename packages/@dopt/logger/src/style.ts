import { tokens } from '@bodo/tokens';
import chalk, { type ChalkFunction } from 'chalk';

const colors = tokens.colors.light;

export const style: Record<string, ChalkFunction> = {
  prefix: chalk.bold.white.bgHex(colors.blurple500),
  debugTitle: chalk.bold.white.bgHex(colors.ultramarine500),
  errorTitle: chalk.bold.white.bgHex(colors.burntOrange500),
  errorBody: chalk.hex(colors.burntOrange500),
  warnTitle: chalk.bold.hex(colors.midnight500).bgHex(colors.sunGlow500),
  infoTitle: chalk.bold.hex(colors.midnight500).bgHex(colors.sky500),
};
