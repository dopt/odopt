import chroma from 'chroma-js';
import { colors } from './color';

const shadowColor = chroma(colors.base.black).alpha(0.2).css();

export const shadows = {
  0: 'none',
  1: `0 0 2px ${shadowColor}`,
  2: `0 1px 2px ${shadowColor}`,
  3: `0 2px 4px ${shadowColor}`,
  4: `0 4px 4px ${shadowColor}`,
  5: `0 8px 12px ${shadowColor}`,
};
