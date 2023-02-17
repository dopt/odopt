import { recipe } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';

export const hotspotClass = recipe({
  base: {
    position: 'absolute',
    margin: '10px',
    zIndex: 2,
    background: '#FF922B',
    borderRadius: '100%',
    padding: '0px',
    width: '12px',
    height: '12px',
  },
  variants: {
    position: {
      nw: {
        top: 0,
        left: 0,
      },
      ne: {
        top: 0,
        right: 0,
      },
      se: {
        right: 0,
        bottom: 0,
      },
      sw: {
        bottom: 0,
        left: 0,
      },
    },
  },
});

export const hotspotPopover = style({
  backgroundColor: 'white',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
});
