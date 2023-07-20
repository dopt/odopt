import { theme } from '@dopt/react-theme';
import {} from '@stitches/core';

const { css } = theme;

const cardRoot = css({
  all: 'revert',
  position: 'relative',
  display: 'flex',
  fontFamily: '$sans',
  fontSize: '$base',
  color: '$content',
  lineHeight: '$base',
  overflow: 'auto',
  '&, & *': {
    boxSizing: 'border-box',
  },
});

const cardContent = css({
  all: 'unset',
  position: 'relative',
  display: 'block',
  padding: '$6',
  borderWidth: '$2',
  borderStyle: 'solid',
  borderColor: '$border',
  borderRadius: '$2',
  margin: '$16 $auto',
  backgroundColor: '$background',
  '&:focus': { outline: 'none' },
});

const cardHeader = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const cardTitle = css({
  all: 'unset',
  fontWeight: '$bold',
  fontSize: '$md',
  lineHeight: '$md',
});

const cardDismissIcon = css({
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

const cardBody = css({
  all: 'unset',
  display: 'block',
  paddingTop: '$4',
  paddingBottom: '$4',
});

const cardFooter = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: '$2',
});

const cardDismissButton = css({
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

const cardCompleteButton = css({
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
  cardRoot,
  cardContent,
  cardHeader,
  cardTitle,
  cardBody,
  cardFooter,
  cardDismissIcon,
  cardDismissButton,
  cardCompleteButton,
  cardRoot as root,
  cardContent as content,
  cardHeader as header,
  cardTitle as title,
  cardBody as body,
  cardFooter as footer,
  cardDismissIcon as dismissIcon,
  cardDismissButton as dismissButton,
  cardCompleteButton as completeButton,
};
