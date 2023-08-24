import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@dopt/react-theme/core';

export const cardRoot = style({
  all: 'revert',
  boxSizing: 'border-box',
  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes.base,
  color: vars.colors.content,
  lineHeight: vars.lineHeights.base,
  overflow: 'auto',
});

globalStyle(`${cardRoot} > *`, {
  boxSizing: 'border-box',
});

export const cardContent = style({
  all: 'unset',
  position: 'relative',
  display: 'block',
  padding: vars.space[6],
  borderWidth: vars.borderWidths[2],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  backgroundColor: vars.colors.background,
  ':focus': { outline: 'none' },
});

export const cardHeader = style({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const cardTitle = style({
  all: 'unset',
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.md,
  lineHeight: vars.lineHeights.md,
});

export const cardDismissIcon = style({
  all: 'unset',
  padding: vars.space[1],
  borderRadius: vars.radii[2],
  alignSelf: 'start',
  color: vars.colors.content,
  transition: `background-color ${vars.transitions.ease}`,
  ':hover': {
    backgroundColor: vars.colors.primaryLight,
  },
  ':focus-visible': {
    outline: 'revert',
  },
});

globalStyle(`${cardDismissIcon} > svg`, {
  display: 'block',
});

export const cardBody = style({
  all: 'unset',
  display: 'block',
  paddingTop: vars.space[4],
  paddingBottom: vars.space[4],
});

export const cardFooter = style({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: vars.space[2],
});

export const cardDismissButton = style({
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

export const cardCompleteButton = style({
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
