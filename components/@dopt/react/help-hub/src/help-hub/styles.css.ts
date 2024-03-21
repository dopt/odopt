import {
  type ComplexStyleRule,
  style,
  globalStyle,
  keyframes,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '@dopt/react-theme/core';

const pulseAnimationScale = '--dopt-pulse-animation-scale';
const pulseAnimationOpacity = '--dopt-pulse-animation-opacity';

const pulseAnimation = keyframes({
  '100%': {
    scale: `var(${pulseAnimationScale})`,
    opacity: `var(${pulseAnimationOpacity})`,
  },
});

export const helpHubIndicator = recipe({
  base: {
    vars: {
      [pulseAnimationScale]: '2.5',
      [pulseAnimationOpacity]: '0',
    },
    all: 'unset',
    boxSizing: 'border-box',
    position: 'absolute',
    display: 'block',
    width: vars.sizes[3],
    height: vars.sizes[3],
    borderRadius: vars.radii.round,
    background: vars.colors.primary,
  },
  variants: {
    animate: {
      true: {
        ':before': {
          content: '',
          display: 'block',
          width: '100%',
          height: '100%',
          borderRadius: vars.radii.round,
          background: vars.colors.primary,
          animationName: pulseAnimation,
          animationDuration: '1s',
          animationTimingFunction: 'ease',
          animationIterationCount: 'infinite',
        },
      },
    },
  },
});

const arrowGap = '--dopt-arrow-gap';

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

export const helpHubPopover = recipe({
  base: {
    vars: {
      [arrowGap]: vars.sizes[6],
    },
    all: 'revert',
    boxSizing: 'border-box',
    position: 'absolute',
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    color: vars.colors.content,
    lineHeight: vars.lineHeights.base,
    zIndex: 10000,
  },
  variants: {
    position: {
      bottom: {},
      left: {},
      top: {
        selectors: {},
      },
      right: {
        selectors: {},
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

export const helpHubContent = style({
  all: 'unset',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'block',
  width: 600,
  padding: vars.space[6],
  borderWidth: vars.borderWidths[2],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  boxShadow: vars.shadows[1],
  backgroundColor: vars.colors.background,
  ':focus': { outline: 'none' },
});

globalStyle(`${helpHubContent} > *`, {
  boxSizing: 'border-box',
});

export const helpHubHeader = style({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: vars.space[2],
});

export const helpHubTitle = style({
  all: 'unset',
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.md,
  lineHeight: vars.lineHeights.md,
});

export const helpHubCloseIcon = style({
  all: 'unset',
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

globalStyle(`${helpHubCloseIcon} > svg`, {
  display: 'block',
});

export const helpHubLauncher = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  margin: '20px',
  zIndex: 10000,
});

export const helpHubBody = style({
  all: 'unset',
  display: 'block',
});

export const helpHubFooter = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'flex-start',
  gap: vars.space[2],
  paddingTop: vars.space[2],
});

export const helpHubDismissAllButton = style({
  all: 'unset',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderRadius: vars.radii[2],
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.content,
  transition: `background-color ${vars.transitions.ease}`,
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
  },
  ':focus-visible': {
    outline: 'revert',
  },
});

export const helpHubCompleteButton = style({
  all: 'unset',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderRadius: vars.radii[2],
  fontWeight: vars.fontWeights.medium,
  color: vars.colors.contentContrast,
  backgroundColor: vars.colors.primary,
  transition: `background-color ${vars.transitions.ease}`,
  ':hover': {
    backgroundColor: vars.colors.primaryDark,
  },
  ':focus-visible': {
    outline: 'revert',
  },
});
