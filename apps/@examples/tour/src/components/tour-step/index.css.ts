import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

export const tourClass = style({});

export const tourPopover = style({
  backgroundColor: 'white',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
});
