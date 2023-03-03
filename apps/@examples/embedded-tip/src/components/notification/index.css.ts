import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const notificationClass = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    background: '#F4FCE3',
    borderRadius: '8px',
    gap: '10px',
    padding: '16px',
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

export const notificationHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
});
export const notificationTitle = style({
  fontWeight: 600,
  fontSize: '18px',
});
export const notificationCloseIcon = style({});
