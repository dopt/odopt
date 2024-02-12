import {
  style,
  type ComplexStyleRule,
  globalStyle,
  keyframes,
} from '@vanilla-extract/css';

import { vars } from '@dopt/react-theme/core';

import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';

const highlightPaddingVar = '--dopt-contextual-assistant-highlight-padding';

export const contextualAssistantHighlight = recipe({
  base: {
    vars: {
      [`${highlightPaddingVar}-top`]: '0px',
      [`${highlightPaddingVar}-right`]: '0px',
      [`${highlightPaddingVar}-bottom`]: '0px',
      [`${highlightPaddingVar}-left`]: '0px',
    },
    zIndex: 10000,
    position: 'absolute',
    pointerEvents: 'none',
    background: `color-mix(in srgb, ${vars.colors.primary} 20%, transparent)`,
    border: `${vars.borderWidths[2]} solid ${vars.colors.primary}`,
    borderRadius: vars.radii[2],
    opacity: 0,
    transition: `all ${vars.transitions.ease}`,
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
    },
  },
});

const popoverArrowSizeVar = '--dopt-contextual-assistant-popover-arrow-size';
const popoverArrowGapVar = '--dopt-contextual-assistant-popover-arrow-gap';

const alignment: Record<string, Record<string, ComplexStyleRule>> = {
  horizontal: {
    start: {
      selectors: {
        '&:before, &:after': {
          left: `var(${popoverArrowGapVar})`,
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
          right: `var(${popoverArrowGapVar})`,
        },
      },
    },
  },
  vertical: {
    start: {
      selectors: {
        '&:before, &:after': {
          top: `var(${popoverArrowGapVar})`,
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
          bottom: `var(${popoverArrowGapVar})`,
        },
      },
    },
  },
};

export const contextualAssistantPopover = recipe({
  base: {
    vars: {
      [popoverArrowSizeVar]: vars.sizes[3],
      [popoverArrowGapVar]: vars.sizes[6],
    },
    all: 'revert',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: 10000,
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    color: vars.colors.content,
    lineHeight: vars.lineHeights.base,
    selectors: {
      '&:before, &:after': {
        content: '',
        position: 'absolute',
        zIndex: 1,
        width: `var(${popoverArrowSizeVar})`,
        height: `var(${popoverArrowSizeVar})`,
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
            top: calc(`var(${popoverArrowSizeVar})`)
              .divide(2)
              .negate()
              .toString(),
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
            right: calc(`var(${popoverArrowSizeVar})`)
              .divide(2)
              .negate()
              .toString(),
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
            bottom: calc(`var(${popoverArrowSizeVar})`)
              .divide(2)
              .negate()
              .toString(),
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
            left: calc(`var(${popoverArrowSizeVar})`)
              .divide(2)
              .negate()
              .toString(),
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

export const contextualAssistantContent = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  width: 400,
  maxHeight: 500,
  overflow: 'auto',
  padding: vars.space[6],
  borderWidth: vars.borderWidths[1],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  boxShadow: vars.shadows[1],
  backgroundColor: vars.colors.background,
  ':focus': { outline: 'none' },
});

export const contextualAssistantHeader = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: vars.space[2],
});

export const contextualAssistantTitle = style({
  all: 'unset',
  boxSizing: 'border-box',
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.md,
  lineHeight: vars.lineHeights.md,
});

export const contextualAssistantDismissIcon = style({
  all: 'unset',
  boxSizing: 'border-box',
  padding: vars.space[1],
  borderRadius: vars.radii[2],
  transition: `background-color ${vars.transitions.ease}`,
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
  },
  ':focus-visible': {
    outline: 'revert',
  },
});

globalStyle(`${contextualAssistantDismissIcon} > svg`, {
  boxSizing: 'border-box',
  display: 'block',
});

const skeletonFadeInOut = keyframes({
  '0%': {
    opacity: 0.2,
  },
  '100%': {
    opacity: 1,
  },
});

export const contextualAssistantSkeleton = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  height: vars.sizes[6],
  borderRadius: vars.radii[2],
  backgroundColor: vars.colors.secondaryLight,
  animation: `${skeletonFadeInOut} 600ms linear infinite alternate`,
});

export const contextualAssistantBody = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
});

export const contextualAssistantBodyHeading = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontWeight: vars.fontWeights.medium,
  paddingTop: vars.space[4],
  ':first-child': {
    paddingTop: 0,
  },
});

export const contextualAssistantAnswer = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
});

export const contextualAssistantCitationLink = style({
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  selectors: {
    '& + &': {
      marginLeft: vars.space[1],
    },
  },
});

export const contextualAssistantCitation = style({
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: vars.fonts.mono,
  fontSize: vars.fontSizes.sm,
  lineHeight: vars.lineHeights.sm,
  paddingInline: vars.space[1],
  borderRadius: vars.radii[1],
  backgroundColor: vars.colors.secondaryLight,
});

export const contextualAssistantSources = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.sm,
  lineHeight: vars.lineHeights.sm,
  listStyle: 'decimal',
  paddingLeft: vars.space[6],
  paddingTop: vars.space[2],
});

export const contextualAssistantSource = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'list-item',
  marginBottom: vars.space[1],
  ':last-child': {
    marginBottom: 0,
  },
});

export const contextualAssistantSourceLink = style({
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.primary,
  transition: `color ${vars.transitions.ease}`,
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
    color: vars.colors.primaryDark,
  },
});