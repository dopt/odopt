import {
  type ComplexStyleRule,
  style,
  globalStyle,
  keyframes,
} from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@dopt/react-theme/core';

const helpHubGap = '--dopt-help-hub-popover-gap';

const alignment: Record<string, Record<string, ComplexStyleRule>> = {
  horizontal: {
    start: {
      selectors: {
        '&:before, &:after': {
          left: `var(${helpHubGap})`,
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
          right: `var(${helpHubGap})`,
        },
      },
    },
  },
  vertical: {
    start: {
      selectors: {
        '&:before, &:after': {
          top: `var(${helpHubGap})`,
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
          bottom: `var(${helpHubGap})`,
        },
      },
    },
  },
};

export const helpHubPopover = recipe({
  base: {
    vars: {
      [helpHubGap]: vars.sizes[6],
    },
    all: 'revert',
    boxSizing: 'border-box',
    position: 'absolute',
    fontFamily: vars.fonts.sans,
    fontSize: vars.fontSizes.base,
    color: vars.colors.content,
    lineHeight: vars.lineHeights.base,
    zIndex: 10000,
    width: 400,
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

export const helpHubContent = style({
  all: 'unset',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'block',
  borderWidth: vars.borderWidths[2],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  boxShadow: vars.shadows[1],
  backgroundColor: vars.colors.background,
  ':focus': { outline: 'none' },
});

globalStyle(`${helpHubContent} > *`, {
  all: 'unset',
  boxSizing: 'border-box',
  padding: `${vars.space[2]} ${vars.space[6]}`,
});

globalStyle(`${helpHubContent} > *:first-child`, {
  paddingTop: vars.space[6],
});

globalStyle(`${helpHubContent} > *:last-child`, {
  paddingBottom: vars.space[6],
});

export const helpHubHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const helpHubTitle = style({
  all: 'unset',
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.md,
  lineHeight: vars.lineHeights.md,
});

export const helpHubHeaderIcon = style({
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

globalStyle(`${helpHubHeaderIcon} > svg`, {
  display: 'block',
});

export const helpHubLauncher = style({
  margin: vars.space[4],
  width: vars.sizes[6],
  height: vars.sizes[6],
});

export const helpHubLauncherIcon = recipe({
  base: {
    display: 'block',
    borderRadius: vars.radii.round,
    border: `${vars.borderWidths[2]} solid ${vars.colors.content}`,
    width: '100%',
    height: '100%',
    color: vars.colors.content,
    backgroundColor: vars.colors.white,
    cursor: 'pointer',
    transition: `background-color ${vars.transitions.ease}`,
    ':hover': {
      backgroundColor: vars.colors.secondaryLight,
    },
  },
  variants: {
    open: {
      true: {
        backgroundColor: vars.colors.secondaryLight,
      },
    },
  },
});

export const helpHubLoader = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'grid',
  gap: vars.space[3],
  paddingBlock: vars.space[3],
});

const skeletonFadeInOut = keyframes({
  '0%': {
    opacity: 0.2,
  },
  '100%': {
    opacity: 1,
  },
});

export const helpHubSkeleton = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  width: '100%',
  height: vars.sizes[6],
  borderRadius: vars.radii[2],
  backgroundColor: vars.colors.secondaryLight,
  animation: `${skeletonFadeInOut} 600ms linear infinite alternate`,
});

export const helpHubBody = style({
  boxSizing: 'border-box',
  display: 'block',
  maxHeight: 450,
  overflow: 'auto',
});

export const helpHubBodyHeading = style({
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

export const helpHubAnswer = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
});

globalStyle(`${helpHubAnswer} *:first-child`, {
  marginBlockStart: 0,
});

globalStyle(`${helpHubAnswer} *:last-child`, {
  marginBlockEnd: 0,
});

globalStyle(
  `${helpHubAnswer} h1, ${helpHubAnswer} h2, ${helpHubAnswer} h3, ${helpHubAnswer} h4, ${helpHubAnswer} h5, ${helpHubAnswer} h6`,
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

globalStyle(`${helpHubAnswer} p`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  marginBlockEnd: vars.space[4],
});

globalStyle(`${helpHubAnswer} ul`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  listStyle: 'disc',
  paddingInlineStart: '1.5em',
  marginBlockEnd: vars.space[4],
});

globalStyle(`${helpHubAnswer} ol`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  listStyle: 'decimal',
  paddingInlineStart: '1.5em',
  marginBlockEnd: vars.space[4],
});

globalStyle(`${helpHubAnswer} pre`, {
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

globalStyle(`${helpHubAnswer} blockquote`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: vars.fontSizes.base,
  lineHeight: vars.lineHeights.base,
  marginBlockEnd: vars.space[4],
});

globalStyle(`${helpHubAnswer} a`, {
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.primary,
  cursor: 'pointer',
});

globalStyle(`${helpHubAnswer} a:hover`, {
  textDecoration: 'underline',
  color: vars.colors.primaryDark,
});

globalStyle(`${helpHubAnswer} code`, {
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: vars.fonts.mono,
});

globalStyle(`${helpHubAnswer} strong`, {
  all: 'unset',
  boxSizing: 'border-box',
  fontWeight: vars.fontWeights.bold,
});

globalStyle(`${helpHubAnswer} em`, {
  all: 'unset',
  boxSizing: 'border-box',
  fontStyle: 'italic',
});

globalStyle(`${helpHubAnswer} img`, {
  all: 'unset',
  display: 'none',
});

globalStyle(`${helpHubAnswer} br`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
});

globalStyle(`${helpHubAnswer} hr`, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'block',
  borderBottomWidth: vars.borderWidths[1],
  borderBottomStyle: 'solid',
  borderBottomColor: vars.colors.border,
  marginBlock: vars.space[4],
});

export const helpHubCitationLink = style({
  selectors: {
    '& + &': {
      marginLeft: vars.space[1],
    },
  },
});

// This requires extra specificity to override the markdown component styles
globalStyle(`a.${helpHubCitationLink}`, {
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.content,
  cursor: 'pointer',
});

globalStyle(`a.${helpHubCitationLink}:hover`, {
  color: vars.colors.content,
  textDecoration: 'none',
});

export const helpHubCitation = style({
  all: 'unset',
  boxSizing: 'border-box',
  fontFamily: vars.fonts.mono,
  fontSize: vars.fontSizes.sm,
  lineHeight: vars.lineHeights.sm,
  paddingInline: vars.space[1],
  borderRadius: vars.radii[1],
  backgroundColor: vars.colors.secondaryLight,
});

export const helpHubSources = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  fontSize: vars.fontSizes.sm,
  lineHeight: vars.lineHeights.sm,
  paddingTop: vars.space[2],
});

export const helpHubAskItem = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  transition: `background-color ${vars.transitions.ease}`,
  border: `${vars.borderWidths[1]} solid ${vars.colors.border}`,
  background: vars.colors.white,
  borderRadius: vars.space[2],
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.space[3],
  padding: `${vars.space[3]} ${vars.space[3]}`,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.colors.secondaryLight,
  },
});

export const helpHubAskItemIcon = style({
  all: 'unset',
  boxSizing: 'border-box',
});

export const helpHubAskItemContent = style({
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

export const helpHubSource = style({
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

export const helpHubSourceLink = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: vars.space[3],
  flexGrow: 1,
  padding: `${vars.space[3]} ${vars.space[3]}`,
});

export const helpHubSourceLinkIndex = style({
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

export const helpHubSourceLinkMetadata = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
});

export const helpHubSourceLinkMetadataTitle = style({
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

export const helpHubSourceLinkMetadataContent = style({
  all: 'unset',
  boxSizing: 'border-box',
  color: vars.colors.secondaryDark,
  fontSize: vars.fontSizes.xs,
  overflow: 'hidden',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '1',
});

globalStyle(`${helpHubSourceLinkMetadataContent} *`, {
  all: 'unset',
  boxSizing: 'border-box',
});

export const helpHubSourceLinkMetadataUrl = style({
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

export const helpHubQuestion = style({
  all: 'unset',
  boxSizing: 'border-box',
  display: 'flex',
  gap: vars.space[2],
  paddingInline: vars.space[6],
  paddingTop: vars.space[3],
  paddingBottom: vars.space[6],
});

export const helpHubInputContainer = style({
  width: '100%',
  display: 'flex',
});

export const helpHubInput = style({
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

export const helpHubQuestionButton = recipe({
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
