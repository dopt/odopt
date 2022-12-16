import { style, globalStyle } from '@vanilla-extract/css';

export const cardClass = style({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  marginBottom: '16px',
  padding: '16px',
  borderRadius: '8px',
  border: '0.5px solid #DCDCDC',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.09)',
  background: '#fff',
  transition: 'all 0.2s ease',
});

export const draggingClass = style({
  rotate: '3deg',
  boxShadow: '0 6px 8px rgba(0, 0, 0, 0.09)',
});

export const titleClass = style({
  margin: 0,
  fontSize: '1rem',
});

export const descriptionClass = style({
  margin: 0,
});

globalStyle('.react-kanban-column [role="button"] > div', {
  display: 'block !important',
});
