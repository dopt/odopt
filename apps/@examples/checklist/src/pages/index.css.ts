import { globalStyle, style } from '@vanilla-extract/css';

import { recipe } from '@vanilla-extract/recipes';

globalStyle('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
});

export const example = style({
  display: 'flex',
  flex: '1 1 100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const checklist = style({
  width: '300px',
  border: '1px solid #DEE2E6',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  fontSize: '18px',
  fontWeight: 600,
  color: 'white',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  background: '#339af0',
  padding: '12px 16px',
});

export const buttons = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  gap: '24px',
});

export const text = recipe({
  base: {
    display: 'flex',
    padding: '12px 16px',
  },
  variants: {
    completed: {
      true: {
        textDecoration: 'line-through',
      },
      false: {},
    },
  },
  defaultVariants: {
    completed: false,
  },
});

export const items = style({
  display: 'flex',
  flexDirection: 'column',
});

export const item = style({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  gap: '8px',
  borderTop: '1px solid #DEE2E6',
});
