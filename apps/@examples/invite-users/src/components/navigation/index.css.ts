import { style } from '@vanilla-extract/css';

export const navigation = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'left',
  fontWeight: 500,
  fontSize: '16px',
  gap: '2px',
});

export const navigationItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  gap: '8px',
});
