import { createGlobalThemeContract } from '@vanilla-extract/css';
import { tokens } from './tokens';

const prefix = 'dopt';

export const vars = createGlobalThemeContract(
  tokens,
  (_value, path) => `${prefix}-${path.join('-')}`
);
