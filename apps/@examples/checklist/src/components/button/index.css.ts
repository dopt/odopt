import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

globalStyle('button', {
  all: 'unset',
  cursor: 'pointer',
});

export const buttonClass = recipe({
  base: {
    height: '40px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: 600,
    textAlign: 'center',
  },
  variants: {
    color: {
      red: {
        background: '#ff6b6b',
      },
      blue: {
        background: '#339af0',
      },
      green: {
        background: '#51cf66',
      },
    },
  },
});

export const buttonTextClass = style({
  padding: '8px 12px',
});
