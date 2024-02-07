import { style, type ComplexStyleRule } from '@vanilla-extract/css';

import { vars } from '@dopt/react-theme/core';

import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';

const arrowSize = '--dopt-arrow-size';
const arrowGap = '--dopt-arrow-gap';

export const contexutalAssistantAnswer = style({
  all: 'unset',
  display: 'block',
});

export const contexutalAssistantContent = style({
  all: 'unset',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'block',
  width: 300,
  padding: vars.space[6],
  borderWidth: vars.borderWidths[1],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  boxShadow: vars.shadows[1],
  backgroundColor: vars.colors.background,
  ':focus': { outline: 'none' },
});

export const contexutalAssistantHeader = style({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: vars.space[2],
});

export const contexutalAssistantTitle = style({
  all: 'unset',
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.md,
  lineHeight: vars.lineHeights.md,
});

export const contextualAssistant = recipe({
  base: {
    zIndex: 10000,
    position: 'absolute',
    background: 'rgba(92, 124, 250, 0.2)',
    pointerEvents: 'none',
    borderRadius: vars.radii[2],
    opacity: 0,
    transition: 'all 200ms ease',
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
    },
    selected: {
      true: {
        background: 'rgba(92, 124, 250, 0.2)',
        cursor: 'unset',
      },
    },
  },
});

const alignment: Record<string, Record<string, ComplexStyleRule>> = {
  horizontal: {
    start: {
      selectors: {
        '&:before, &:after': {
          left: `var(${arrowGap})`,
        },
      },
    },
    center: {
      selectors: {
        '&:before, &:after': {
          right: 0,
          left: 0,
          marginRight: 'auto',
          marginLeft: 'auto',
        },
      },
    },
    end: {
      selectors: {
        '&:before, &:after': {
          right: `var(${arrowGap})`,
        },
      },
    },
  },
  vertical: {
    start: {
      selectors: {
        '&:before, &:after': {
          top: `var(${arrowGap})`,
        },
      },
    },
    center: {
      selectors: {
        '&:before, &:after': {
          top: 0,
          bottom: 0,
          marginTop: 'auto',
          marginBottom: 'auto',
        },
      },
    },
    end: {
      selectors: {
        '&:before, &:after': {
          bottom: `var(${arrowGap})`,
        },
      },
    },
  },
};

export const contextualAssistantPopover = recipe({
  base: {
    vars: {
      [arrowSize]: vars.sizes[3],
      [arrowGap]: vars.sizes[6],
    },
    all: 'revert',
    boxSizing: 'border-box',
    position: 'absolute',
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    color: vars.colors.content,
    lineHeight: vars.lineHeights.base,
    selectors: {
      '&:before, &:after': {
        content: '',
        position: 'absolute',
        zIndex: 1,
        width: `var(${arrowSize})`,
        height: `var(${arrowSize})`,
      },
      '&:before': {
        background: vars.colors.border,
      },
      '&:after': {
        background: vars.colors.background,
      },
    },
  },
  variants: {
    position: {
      bottom: {
        selectors: {
          '&:before, &:after': {
            top: calc(`var(${arrowSize})`).divide(2).negate().toString(),
            clipPath: 'polygon(50% 0, 100% 50%, 0 50%)',
          },
          '&:after': {
            translate: `0 ${vars.borderWidths[1]}`,
          },
        },
      },
      left: {
        selectors: {
          '&:before, &:after': {
            right: calc(`var(${arrowSize})`).divide(2).negate().toString(),
            clipPath: 'polygon(50% 100%, 100% 50%, 50% 0)',
          },
          '&:after': {
            translate: `${calc.negate(vars.borderWidths[1])} 0`,
          },
        },
      },
      top: {
        selectors: {
          '&:before, &:after': {
            bottom: calc(`var(${arrowSize})`).divide(2).negate().toString(),
            clipPath: 'polygon(50% 100%, 0 50%, 100% 50%)',
          },
          '&:after': {
            translate: `0 ${calc.negate(vars.borderWidths[1])}`,
          },
        },
      },
      right: {
        selectors: {
          '&:before, &:after': {
            left: calc(`var(${arrowSize})`).divide(2).negate().toString(),
            clipPath: 'polygon(50% 100%, 0 50%, 50% 0)',
          },
          '&:after': {
            translate: `${vars.borderWidths[1]} 0`,
          },
        },
      },
    },
    alignment: {
      start: {},
      center: {},
      end: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        position: 'top',
        alignment: 'start',
      },
      style: alignment.horizontal.start,
    },
    {
      variants: {
        position: 'top',
        alignment: 'center',
      },
      style: alignment.horizontal.center,
    },
    {
      variants: {
        position: 'top',
        alignment: 'end',
      },
      style: alignment.horizontal.end,
    },

    {
      variants: {
        position: 'bottom',
        alignment: 'start',
      },
      style: alignment.horizontal.start,
    },
    {
      variants: {
        position: 'bottom',
        alignment: 'center',
      },
      style: alignment.horizontal.center,
    },
    {
      variants: {
        position: 'bottom',
        alignment: 'end',
      },
      style: alignment.horizontal.end,
    },

    {
      variants: {
        position: 'right',
        alignment: 'start',
      },
      style: alignment.vertical.start,
    },
    {
      variants: {
        position: 'right',
        alignment: 'center',
      },
      style: alignment.vertical.center,
    },
    {
      variants: {
        position: 'right',
        alignment: 'end',
      },
      style: alignment.vertical.end,
    },

    {
      variants: {
        position: 'left',
        alignment: 'start',
      },
      style: alignment.vertical.start,
    },
    {
      variants: {
        position: 'left',
        alignment: 'center',
      },
      style: alignment.vertical.center,
    },
    {
      variants: {
        position: 'left',
        alignment: 'end',
      },
      style: alignment.vertical.end,
    },
  ],
});
