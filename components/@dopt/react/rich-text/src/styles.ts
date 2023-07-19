import { css } from '@stitches/core';

export const richTextRoot = css({
  '& > *:first-child': {
    marginBlockStart: 0,
  },
  '& > *:last-child': {
    marginBlockEnd: 0,
  },
});

export const richTextAlignment = css({
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

export const richTextVideo = css({
  border: 0,
});
