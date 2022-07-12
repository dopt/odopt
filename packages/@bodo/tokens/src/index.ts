import { borderStyles, radii, borderWidths } from './border';
import { breakpoints } from './breakpoints';
import { colors } from './color';
import { opacity } from './opacity';
import { shadows } from './shadow';
import { space } from './space';
import { fontSizes, fontWeights, fonts } from './typography';

export const tokens = {
  borderStyles,
  borderWidths,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  opacity,
  radii,
  shadows,
  space,
};

export type { Breakpoint } from './breakpoints';
export { breakpointNames } from './breakpoints';
export type { Mode, Color } from './color';
export type Tokens = typeof tokens;
