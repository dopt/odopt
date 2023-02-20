import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

export const notificationClass = recipe({
  base: {
    position: 'absolute',
    bottom: '0',
    width: calc.subtract('100%', '32px'),
    color: '#5C7CFA',
    fontSize: '14px',
    margin: '10px',
    background: '#DBE4FF',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    padding: '6px',
  },
  variants: {
    open: {
      true: {},
      false: {
        display: 'none',
      },
    },
  },
});
