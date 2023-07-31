import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '@dopt/react-theme';

export const modalRoot = style({
  all: 'revert',
  boxSizing: 'border-box',
  position: 'fixed',
  inset: 0,
  fontFamily: vars.fonts.sans,
  fontSize: vars.fontSizes.base,
  color: vars.colors.content,
  lineHeight: vars.lineHeights.base,
  overflow: 'auto',
});

globalStyle(`${modalRoot} *`, {
  boxSizing: 'border-box',
});

export const modalOverlay = style({
  all: 'unset',
  position: 'fixed',
  inset: 0,
  backgroundColor: vars.colors.overlay,
});

export const modalContent = style({
  all: 'unset',
  position: 'relative',
  display: 'block',
  width: 500,
  maxWidth: '80vw',
  padding: vars.space[6],
  borderWidth: vars.borderWidths[2],
  borderStyle: 'solid',
  borderColor: vars.colors.border,
  borderRadius: vars.radii[2],
  margin: `${vars.space[16]} auto`,
  boxShadow: vars.shadows[2],
  backgroundColor: vars.colors.background,
  ':focus': { outline: 'none' },
});

export const modalHeader = style({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const modalTitle = style({
  all: 'unset',
  fontWeight: vars.fontWeights.bold,
  fontSize: vars.fontSizes.md,
  lineHeight: vars.lineHeights.md,
});

export const modalDismissIcon = style({
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

globalStyle(`${modalDismissIcon} > svg`, {
  display: 'block',
});

export const modalBody = style({
  all: 'unset',
  display: 'block',
  paddingTop: vars.space[4],
  paddingBottom: vars.space[4],
});

export const modalFooter = style({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: vars.space[2],
});

export const modalDismissButton = style({
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

export const modalCompleteButton = style({
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

export const lockScroll = style({
  overflow: 'hidden !important',
});
