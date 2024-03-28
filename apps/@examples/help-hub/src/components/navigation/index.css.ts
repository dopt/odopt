import { style } from '@vanilla-extract/css';

export const navigation = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'left',
  fontWeight: 500,
  fontSize: '16px',
  gap: '8px',
});

export const subNavigationItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  padding: '8px 54px',
  height: '40px',
  gap: '18px',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(71, 77, 102, 0.64)',
    },
  },
});

export const navigationItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 12px',
  gap: '18px',
  boxShadow: 'rgba(0, 0, 0, 0) 4px 0px 0px inset',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(71, 77, 102, 0.64)',
    },
  },
});
