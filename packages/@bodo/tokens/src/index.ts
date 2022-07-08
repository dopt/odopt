import { borderStyles, radii, borderWidth } from './border';
import { breakpoints } from './breakpoints';
import { colors } from './color';
import { opacity } from './opacity';
import { space } from './space';
import { fontSizes, fontWeights, fonts } from './typography';

export const tokens = {
  borderStyles,
  borderWidth,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  opacity,
  radii,
  space,
};

export type { Breakpoint } from './breakpoints';
export { breakpointNames } from './breakpoints';
export type { Mode, Color } from './color';
export type Tokens = typeof tokens;
