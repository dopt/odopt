import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
});

export const example = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '800px',
  padding: '50px',
});

export const embeddedTipContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0',
});
