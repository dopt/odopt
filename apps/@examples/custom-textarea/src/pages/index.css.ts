import { style, globalStyle, keyframes } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
});

export const example = style({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const textareaContainer = style({
  position: 'relative',
});

export const textareaClass = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flexStart',
  padding: '16px',
  width: '500px',
  height: '150px',
  background: '#FFFFFF',
  border: '1px solid #ADB5BD',
  borderRadius: '8px',
  selectors: {
    '&:focus-visible': {
      outline: 'none',
    },
  },
});

const pulse = keyframes({
  '0%': {
    boxShadow: '0 0 5px 0 rgba(92, 124, 250, 0.2)',
    scale: 1,
  },
  '100%': {
    boxShadow: '0px 0px 8px 8px rgba(92, 124, 250, 0.2)',
    scale: 1,
  },
});

export const highlight = style({
  animationName: pulse,
  animationIterationCount: 'infinite',
  animationDuration: '0.75s',
  animationDirection: 'alternate',
});
