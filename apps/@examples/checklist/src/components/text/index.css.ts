import { recipe } from '@vanilla-extract/recipes';

export const textClass = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    strikeThrough: {
      true: {
        textDecoration: 'line-through',
        fontWeight: 400,
        color: '#ADB5BD',
      },
      false: {},
    },
  },
  defaultVariants: {
    strikeThrough: false,
  },
});
