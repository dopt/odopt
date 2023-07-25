import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const richTextRoot = style({});

globalStyle(`${richTextRoot} > *:first-child`, {
  marginBlockStart: 0,
});

globalStyle(`${richTextRoot} > *:last-child`, {
  marginBlockEnd: 0,
});

export const richTextAlignment = recipe({
  variants: {
    align: {
      left: {
        textAlign: 'left',
      },
      right: {
        textAlign: 'right',
      },
      center: {
        textAlign: 'center',
      },
      justify: {
        textAlign: 'justify',
      },
    },
  },
});

export const richTextVideo = style({
  border: 0,
});
