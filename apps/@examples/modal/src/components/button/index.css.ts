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
      pink: {
        background: '#F06595',
      },
    },
  },
});

export const buttonTextClass = style({
  padding: '8px 12px',
});