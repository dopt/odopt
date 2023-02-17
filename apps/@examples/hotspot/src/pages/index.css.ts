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
  gap: '100px',
  justifyContent: 'center',
});
