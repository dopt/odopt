import { css } from '@stitches/core';

export const imageContainerClass = css({
  position: 'relative',
  display: 'block',
});

export const alignClass = css({
  variants: {
    left: {
      true: {
        textAlign: 'left',
      },
    },
    right: {
      true: {
        textAlign: 'right',
      },
    },
    center: {
      true: {
        textAlign: 'center',
      },
    },
    justify: {
      true: {
        textAlign: 'justify',
      },
    },
  },
});
