import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@dopt/react-theme/core';

export const checklistRoot = style({
  all: 'revert',
  boxSizing: 'border-box',
  padding: vars.space[6],
  borderWidth: vars.borderWidths[2],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes.base,
  color: vars.colors.content,
  lineHeight: vars.lineHeights.base,
  background: vars.colors.background,
});

globalStyle(`${checklistRoot} > *`, {
  boxSizing: 'border-box',
});

export const checklistHeader = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  paddingBottom: vars.space[1],
});

export const checklistTitle = style({
  all: 'unset',
  fontSize: vars.fontSizes.md,
  fontWeight: vars.fontWeights.bold,
  lineHeight: vars.lineHeights.md,
});

export const checklistBody = style({
  paddingBottom: vars.space[4],
});

export const checklistDismissIcon = style({
  all: 'unset',
  padding: vars.space[1],
  borderRadius: vars.radii[2],
  alignSelf: 'start',
  color: vars.colors.secondary,
  transition: `background-color ${vars.transitions.ease}`,
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
  },
  ':focus-visible': {
    outline: 'revert',
  },
});

globalStyle(`${checklistDismissIcon} > svg`, {
  display: 'block',
});

export const checklistProgress = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[4],
  paddingBottom: vars.space[4],
});

export const checklistProgressMeter = style({
  all: 'unset',
  display: 'block',
  height: vars.sizes[2],
  flexGrow: 1,
  borderRadius: vars.radii[1],
  backgroundColor: vars.colors.secondaryLight,
});

export const checklistProgressMeterBar = style({
  all: 'unset',
  display: 'block',
  width: 0,
  height: vars.sizes[2],
  flexShrink: 0,
  borderRadius: vars.radii[1],
  backgroundColor: vars.colors.primary,
  transition: `width ${vars.transitions.ease}`,
});

export const checklistProgressContent = style({
  all: 'unset',
  fontSize: vars.fontSizes.sm,
  lineHeight: vars.lineHeights.sm,
});

export const checklistItems = style({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[6],
  listStyle: 'none',
});

export const checklistItem = style({
  all: 'unset',
  display: 'flex',
  gap: vars.space[3],
  paddingBottom: vars.space[6],
  borderBottomWidth: vars.borderWidths[1],
  borderBottomStyle: 'solid',
  borderBottomColor: vars.colors.border,
  ':last-child': {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
});

export const checklistItemIcon = style({
  all: 'unset',
  flexShrink: 0,
});

export const checklistItemContent = style({
  all: 'unset',
  flexGrow: 1,
});

export const checklistItemTitle = recipe({
  base: {
    all: 'unset',
    display: 'block',
    fontWeight: vars.fontWeights.bold,
  },
  variants: {
    disabled: {
      true: {
        color: vars.colors.contentLight,
        textDecoration: 'line-through',
      },
    },
  },
});

export const checklistItemBody = recipe({
  base: {
    all: 'unset',
    display: 'block',
    fontSize: vars.fontSizes.sm,
    lineHeight: vars.lineHeights.sm,
  },
  variants: {
    disabled: {
      true: {
        color: vars.colors.contentLight,
      },
    },
  },
});

export const checklistItemCompleteButton = style({
  all: 'unset',
  padding: `${vars.space[2]} ${vars.space[3]}`,
  borderRadius: vars.radii[2],
  marginTop: vars.space[3],
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

export const checklistItemSkipIcon = style({
  all: 'unset',
  flexShrink: 0,
  padding: vars.space[1],
  borderRadius: vars.radii[2],
  alignSelf: 'start',
  color: vars.colors.secondary,
  transition: `background-color ${vars.transitions.ease}`,
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
  },
  ':focus-visible': {
    outline: 'revert',
  },
});

globalStyle(`${checklistItemSkipIcon} > svg`, {
  display: 'block',
});
