import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const modalClass = recipe({
  base: {
    width: '352px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    background: '#FFFFFF',
    border: '1px solid #ADB5BD',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px',
    gap: '24px',
    padding: '24px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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

export const modalHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
});
export const modalTitle = style({
  fontWeight: 600,
  fontSize: '18px',
});
export const modalCloseIcon = style({});
