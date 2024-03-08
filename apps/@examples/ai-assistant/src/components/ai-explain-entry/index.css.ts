import { style } from '@vanilla-extract/css';

export const flex = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 5,
});

export const shortcutTag = style({
  display: 'flex',
  backgroundColor: '#C7CADC',
  color: '#474D66',
  borderRadius: '6px',
  padding: '2px 4px',
  fontWeight: 500,
});
