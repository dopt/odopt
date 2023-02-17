import { recipe } from '@vanilla-extract/recipes';

export const radioClass = recipe({
  base: {
    border: '2px solid #ADB5BD',
    borderRadius: '100%',
    padding: '2px',
    width: '20px',
    height: '20px',
    margin: '4px',
  },
  variants: {
    checked: {
      true: {
        textDecoration: 'line-through',
        background: '#339af0',
        border: '2px solid #339af0',
      },
      false: {},
    },
  },
  defaultVariants: {
    checked: false,
  },
});
