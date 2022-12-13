import { style } from '@vanilla-extract/css';

export const cardClass = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '4px',
  background: '#fff',
  transition: 'all 0.2s ease',
});

export const draggingClass = style({
  rotate: '-2.5deg',
  boxShadow: '0 8px 8px rgba(0, 0, 0, 0.1)',
});

export const titleClass = style({
  margin: 0,
  fontSize: '1rem',
});

export const descriptionClass = style({
  margin: 0,
  paddingTop: '12px',
  borderTop: '1px solid #E9ECEF',
});
