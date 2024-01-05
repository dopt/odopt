import { style } from '@vanilla-extract/css';

export const table = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '12px',
});

export const createProject = style({
  display: 'flex',
  flexDirection: 'row',
});

export const tableHeading = style({
  display: 'flex',
  borderTop: '1px solid var(--color-border)',
  gap: '100px',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '24px 0',
});

export const tableTitle = style({
  fontWeight: 500,
  fontSize: '22px',
});

export const tableHead = style({
  textAlign: 'left',
  padding: '12px',
  fontWeight: 500,
  fontSize: '16px',
});

export const tableCell = style({
  padding: '12px',
});

export const tableRow = style({
  borderBottom: '1px solid var(--color-border)',
});
