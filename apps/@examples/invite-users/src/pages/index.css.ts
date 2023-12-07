import { style, globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
});

export const example = style({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
});

export const heading = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'space-between',
  gap: '32px',
  padding: '32px',
  borderRight: '1px solid var(--color-border)',
});

export const leftNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

export const rightNav = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

export const user = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
});
