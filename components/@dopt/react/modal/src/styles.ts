import { theme } from '@dopt/react-theme';
import {} from '@stitches/core';

const { css } = theme;

const modalRoot = css({
  all: 'revert',
  fontFamily: '$sans',
  fontSize: '$base',
  color: '$content',
  lineHeight: '$base',
  overflow: 'auto',
  '&, & *': {
    boxSizing: 'border-box',
  },
});

const modalOverlay = css({
  all: 'unset',
  position: 'fixed',
  inset: 0,
  backgroundColor: '$overlay',
});

const modalContent = css({
  all: 'unset',
  position: 'relative',
  display: 'block',
  width: 500,
  maxWidth: '80vw',
  padding: '$6',
  borderWidth: '$2',
  borderStyle: 'solid',
  borderColor: '$border',
  borderRadius: '$2',
  margin: '$16 $auto',
  boxShadow: '$2',
  backgroundColor: '$background',
  '&:focus': { outline: 'none' },
});

const modalHeader = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const modalTitle = css({
  all: 'unset',
  fontWeight: '$bold',
  fontSize: '$md',
  lineHeight: '$md',
});

const modalDismissIcon = css({
  all: 'unset',
  padding: '$1',
  borderRadius: '$2',
  alignSelf: 'start',
  color: '$content',
  transition: 'background-color $ease',
  '& > svg': {
    display: 'block',
  },
  '&:hover': {
    backgroundColor: '$primaryLight',
  },
  '&:focus-visible': {
    outline: 'revert',
  },
});

const modalBody = css({
  all: 'unset',
  paddingTop: '$4',
  paddingBottom: '$4',
});

const modalFooter = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: '$2',
});

const modalDismissButton = css({
  all: 'unset',
  padding: '$2 $3',
  borderRadius: '$2',
  fontWeight: '$medium',
  color: '$content',
  transition: 'background-color $ease',
  '&:hover': {
    backgroundColor: '$primaryLight',
  },
  '&:focus-visible': {
    outline: 'revert',
  },
});

const modalCompleteButton = css({
  all: 'unset',
  padding: '$2 $3',
  borderRadius: '$2',
  fontWeight: '$medium',
  color: '$contentContrast',
  backgroundColor: '$primary',
  transition: 'background-color $ease',
  '&:hover': {
    backgroundColor: '$primaryDark',
  },
  '&:focus-visible': {
    outline: 'revert',
  },
});

export {
  modalRoot,
  modalOverlay,
  modalContent,
  modalHeader,
  modalTitle,
  modalBody,
  modalFooter,
  modalDismissIcon,
  modalDismissButton,
  modalCompleteButton,
  modalRoot as root,
  modalOverlay as overlay,
  modalContent as content,
  modalHeader as header,
  modalTitle as title,
  modalBody as body,
  modalFooter as footer,
  modalDismissIcon as dismissIcon,
  modalDismissButton as dismissButton,
  modalCompleteButton as completeButton,
};
