import { style } from '@vanilla-extract/css';

export const dialogClass = style({
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  border: '1px solid #ADB5BD',
  boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.05)',
  borderRadius: '8px',
  gap: '10px',
  padding: '16px',
  width: '200px',
});

export const dialogHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
});
export const dialogTitle = style({
  fontWeight: 600,
  fontSize: '16px',
});
