import {
  style,
  type ComplexStyleRule,
  globalStyle,
  keyframes,
} from '@vanilla-extract/css';

import { vars } from '@dopt/react-theme/core';

import { recipe } from '@vanilla-extract/recipes';

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
    transition: `all ${vars.transitions.linearFast}`,
  },
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
    },
  },
});

const popoverGapVar = '--dopt-contextual-assistant-popover-gap';

const alignment: Record<string, Record<string, ComplexStyleRule>> = {
  horizontal: {
    start: {
      selectors: {
        '&:before, &:after': {
          left: `var(${popoverGapVar})`,
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
          right: `var(${popoverGapVar})`,
        },
      },
    },
  },
  vertical: {
    start: {
      selectors: {
        '&:before, &:after': {
          top: `var(${popoverGapVar})`,
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
          bottom: `var(${popoverGapVar})`,
        },
      },
    },
  },
};

export const contextualAssistantPopover = recipe({
  base: {
    all: 'revert',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: 10000,
    width: 400,
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    color: vars.colors.content,
    lineHeight: vars.lineHeights.base,
  },
  variants: {
    position: {
      bottom: {},
      left: {},
      top: {},
      right: {},
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
  paddingLeft: vars.space[6],
  paddingRight: vars.space[6],
  paddingTop: vars.space[6],
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
  cursor: 'pointer',
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
  maxHeight: 450,
  overflow: 'auto',
  paddingLeft: vars.space[6],
  paddingRight: vars.space[6],
  paddingTop: vars.space[3],
  paddingBottom: vars.space[3],
});

export const contextualAssistantBodyHeading = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontWeight: vars.fontWeights.medium,
  paddingTop: vars.space[4],
  ':first-child': {
    paddingTop: 0,
    paddingBottom: vars.space[4],
  },
});

export const contextualAssistantAnswer = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
});

globalStyle(`${contextualAssistantAnswer} *:first-child`, {
  marginBlockStart: 0,
});

globalStyle(`${contextualAssistantAnswer} *:last-child`, {
  marginBlockEnd: 0,
});

globalStyle(
  `${contextualAssistantAnswer} h1, ${contextualAssistantAnswer} h2, ${contextualAssistantAnswer} h3, ${contextualAssistantAnswer} h4, ${contextualAssistantAnswer} h5, ${contextualAssistantAnswer} h6`,
  {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'block',
    fontSize: vars.fontSizes.base,
    fontWeight: vars.fontWeights.bold,
    lineHeight: vars.lineHeights.base,
    marginBlockStart: vars.space[4],
    marginBlockEnd: vars.space[1],
  }
);

globalStyle(`${contextualAssistantAnswer} p`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  marginBlockEnd: vars.space[4],
});

globalStyle(`${contextualAssistantAnswer} ul`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  listStyle: 'disc',
  paddingInlineStart: '1.5em',
  marginBlockEnd: vars.space[4],
});

globalStyle(`${contextualAssistantAnswer} ol`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  listStyle: 'decimal',
  paddingInlineStart: '1.5em',
  marginBlockEnd: vars.space[4],
});

globalStyle(`${contextualAssistantAnswer} pre`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  maxWidth: '100%',
  overflow: 'auto',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  whiteSpace: 'pre',
  marginBlockEnd: vars.space[4],
});

globalStyle(`${contextualAssistantAnswer} blockquote`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  marginBlockEnd: vars.space[4],
});

globalStyle(`${contextualAssistantAnswer} a`, {
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.primary,
  cursor: 'pointer',
});

globalStyle(`${contextualAssistantAnswer} a:hover`, {
  textDecoration: 'underline',
  color: vars.colors.primaryDark,
});

globalStyle(`${contextualAssistantAnswer} code`, {
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: vars.fonts.mono,
});

globalStyle(`${contextualAssistantAnswer} strong`, {
  all: 'unset',
  boxSizing: 'border-box',
  fontWeight: vars.fontWeights.bold,
});

globalStyle(`${contextualAssistantAnswer} em`, {
  all: 'unset',
  boxSizing: 'border-box',
  fontStyle: 'italic',
});

globalStyle(`${contextualAssistantAnswer} img`, {
  all: 'unset',
  display: 'none',
});

globalStyle(`${contextualAssistantAnswer} br`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
});

globalStyle(`${contextualAssistantAnswer} hr`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  borderBottomWidth: vars.borderWidths[1],
  borderBottomStyle: 'solid',
  borderBottomColor: vars.colors.border,
  marginBlock: vars.space[4],
});

export const contextualAssistantCitationLink = style({
  selectors: {
    '& + &': {
      marginLeft: vars.space[1],
    },
  },
});

// This requires extra specificity to override the markdown component styles
globalStyle(`a.${contextualAssistantCitationLink}`, {
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.content,
  cursor: 'pointer',
});

globalStyle(`a.${contextualAssistantCitationLink}:hover`, {
  color: vars.colors.content,
  textDecoration: 'none',
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
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  fontSize: vars.fontSizes.sm,
  lineHeight: vars.lineHeights.sm,
  paddingTop: vars.space[2],
});

export const contextualAssistantSource = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  transition: `background-color ${vars.transitions.ease}`,
  border: `${vars.borderWidths[1]} solid ${vars.colors.border}`,
  background: vars.colors.white,
  borderRadius: vars.space[2],
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.colors.secondaryLight,
  },
});

export const contextualAssistantSourceLink = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.space[3],
  flexGrow: 1,
  padding: `${vars.space[3]} ${vars.space[3]}`,
});

export const contextualAssistantSourceLinkIndex = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: vars.sizes[5],
  height: vars.sizes[5],
  borderRadius: vars.radii.round,
  backgroundColor: vars.colors.secondaryLight,
  color: vars.colors.secondary,
  font: vars.fonts.mono,
  fontSize: vars.fontSizes.xs,
});

export const contextualAssistantSourceLinkMetadata = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
});

export const contextualAssistantSourceLinkMetadataTitle = style({
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.secondaryDark,
  fontWeight: vars.fontWeights.medium,
  fontSize: vars.fontSizes.base,
  overflow: 'hidden',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '1',
});

export const contextualAssistantSourceLinkMetadataUrl = style({
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.secondary,
  fontSize: vars.fontSizes.xs,
  overflow: 'hidden',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '1',
});

export const contextualAssistantQuestion = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  gap: vars.space[2],
  paddingInline: vars.space[6],
  paddingTop: vars.space[3],
  paddingBottom: vars.space[6],
});

export const contextualAssistantQuestionInput = style({
  all: 'unset',
  boxSizing: 'border-box',
  flexGrow: 1,
  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  border: `${vars.borderWidths[1]} solid ${vars.colors.border}`,
  padding: `${vars.space[2]} ${vars.space[3]}`,
  background: vars.colors.white,
  borderRadius: vars.space[2],
  transition: `all ${vars.transitions.ease}`,
  '::placeholder': {
    color: vars.colors.contentLight,
  },
  ':focus-visible': {
    borderColor: vars.colors.primary,
    outline: `${vars.colors.primary} solid ${vars.borderWidths[1]}`,
  },
});

export const contextualAssistantQuestionButton = recipe({
  base: {
    all: 'unset',
    boxSizing: 'border-box',
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    fontWeight: vars.fontWeights.medium,
    lineHeight: vars.lineHeights.base,
    transition: `all ${vars.transitions.ease}`,
    border: `${vars.borderWidths[1]} solid ${vars.colors.border}`,
    padding: `${vars.space[2]} ${vars.space[3]}`,
    borderRadius: vars.space[2],
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.4,
      },
      false: {
        cursor: 'pointer',
        color: vars.colors.content,
        ':hover': {
          color: vars.colors.primary,
        },
        ':focus-visible': {
          color: vars.colors.primary,
          borderColor: vars.colors.primary,
          outline: `${vars.colors.primary} solid ${vars.borderWidths[1]}`,
        },
      },
    },
  },
});
