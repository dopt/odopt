import { style } from '@vanilla-extract/css';

export const destinations = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '0 10%',
  height: '100%',
  gap: '12px',
  fontFamily:
    '"SF UI Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
});

export const table = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
  borderTop: '1px solid rgb(230, 232, 240)',
  borderLeft: '1px solid rgb(230, 232, 240)',
  borderRight: '1px solid rgb(230, 232, 240)',
});

export const createProject = style({
  display: 'flex',
  flexDirection: 'row',
});

export const pageHeading = style({
  display: 'flex',
  borderTop: '1px solid rgb(230, 232, 240)',
  gap: '100px',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: '24px',
});

export const pageTitle = style({
  fontWeight: 600,
  fontSize: '32px',
  color: 'rgb(71, 77, 102)',
});

export const controls = style({
  display: 'flex',
  flexDirection: 'row',
  padding: '24px 0',
  justifyContent: 'space-between',
});

export const controlsRight = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
});

export const tabs = style({
  display: 'flex',
  flexDirection: 'row',
  color: 'var(--dopt-colors-content)',
  gap: '15px',
});
export const tab = style({
  display: 'flex',
  flexDirection: 'row',
  padding: '8px 16px',
  borderRadius: '4px',
  selectors: {
    '&:hover': {
      backgroundColor: 'rgb(237, 239, 245)',
      cursor: 'pointer',
    },
    '&.selected': {
      backgroundColor: 'rgb(244, 245, 249)',
      color: 'rgb(51, 102, 255)',
    },
  },
});

export const search = style({
  display: 'flex',
  flexDirection: 'row',
});
export const searchInput = style({
  appearance: 'none',
  borderRadius: '4px',
  border: '1px solid  rgb(216, 218, 229)',
  padding: '0 12px',
});

export const button = style({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'rgb(41, 82, 204)',
  borderRadius: '4px',
  color: 'white',
  padding: '0 16px',
});

export const tableBody = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0%',
});

export const tableCell = style({
  display: 'flex',
  flex: '0 0 auto',
  padding: '12px',
  alignItems: 'center',
  color: 'var(--dopt-colors-content)',
  fontSize: '14px',
  fontWeight: 400,
  width: '132px',
});

export const tableHeader = style({
  display: 'flex',
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  background: 'rgb(249, 250, 252)',
  color: 'rgb(105, 111, 140)',
  textTransform: 'uppercase',
  borderBottom: '1px solid rgb(230, 232, 240)',
  fontWeight: 600,
  height: '56px',
});

export const tableHead = style({
  display: 'flex',
  flex: '0 0 auto',
  textAlign: 'left',
  padding: '12px',
  alignItems: 'center',
  width: '132px',
  fontWeight: 500,
  fontSize: '14px !important',
});

export const tableRow = style({
  display: 'flex',
  flexDirection: 'row',
  height: '64px',
  borderBottom: '1px solid rgb(230, 232, 240)',
});

export const nameCell = style({
  display: 'flex',
  flex: '1 1 0%',
  flexShrink: 0,
  gap: '10px',
  alignItems: 'center',
  fontSize: '20px',
});
