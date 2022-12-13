import { style, keyframes } from '@vanilla-extract/css';

const pulse = keyframes({
  '0%': {
    boxShadow: '0 0 5px 0 rgba(51, 154, 240, 0.75)',
    scale: 1,
  },
  '100%': {
    boxShadow: '0 0 10px 4px rgba(51, 154, 240, 0.75)',
    scale: 1,
  },
});

export const highlight = style({
  animationName: pulse,
  animationIterationCount: 'infinite',
  animationDuration: '0.75s',
  animationDirection: 'alternate',
});
