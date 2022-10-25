import chroma from 'chroma-js';
import { colors } from './color';

const baseShadowColor = chroma(colors.base.black);

export const shadows = {
  0: 'none',
  1: `0 0 4px ${baseShadowColor.alpha(0.04).css()}`,
  2: `0 2px 4px ${baseShadowColor.alpha(0.04).css()}`,
  3: `0 4px 8px ${baseShadowColor.alpha(0.04).css()}`,
  4: `0 4px 12px 4px ${baseShadowColor.alpha(0.08).css()}`,
  5: `0 8px 20px 8px ${baseShadowColor.alpha(0.08).css()}`,
};
