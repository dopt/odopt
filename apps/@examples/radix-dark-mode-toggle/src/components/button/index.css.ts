import { style, globalStyle } from '@vanilla-extract/css';

globalStyle('button', {
  all: 'unset',
  cursor: 'pointer',
});

export const buttonClass = style({
  width: '100%',
  height: '40px',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  fontWeight: 600,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

export const buttonTextClass = style({
  padding: '8px 12px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4px',
});
