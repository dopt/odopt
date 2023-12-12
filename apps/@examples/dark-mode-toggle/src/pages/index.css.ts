import { style, globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
});

globalStyle('[data-radix-popper-content-wrapper]', {
  zIndex: '10 !important', // radix :(
});

export const example = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  maxWidth: '1170px',
  margin: '0 auto',
});

export const heading = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '64px',
  padding: '24px 0',
});

export const leftNav = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '64px',
});

export const rightNav = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '24px',
});

export const navigation = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontWeight: 500,
  fontSize: '16px',
  gap: '32px',
});

export const user = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
});
