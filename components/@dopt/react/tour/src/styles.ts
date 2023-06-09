import {} from '@stitches/core';
import { theme } from '@dopt/react-theme';

const { css } = theme;

const tourItemRoot = css({
  all: 'revert',
});

const tourItemAnchor = css({
  all: 'revert',
});

const tourItemPopover = css({
  all: 'revert',
  position: 'absolute',
});

const tourItemContent = css({
  all: 'unset',
  position: 'relative',
  display: 'block',
  maxWidth: '80vw',
  padding: '$4',
  borderWidth: '$1',
  borderStyle: 'solid',
  borderColor: '$border',
  borderRadius: '$2',
  boxShadow: '$2',
  backgroundColor: '$background',
  '&:focus': { outline: 'none' },
});

const tourItemBody = css({
  all: 'unset',
  paddingTop: '$4',
  paddingBottom: '$4',
});

const tourItemHeader = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const tourItemTitle = css({
  all: 'unset',
  fontWeight: '$bold',
  fontSize: '$md',
  lineHeight: '$md',
});

const tourItemDismissIcon = css({
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

const tourItemFooter = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: '$2',
});

const tourItemBackButton = css({
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

const tourItemNextButton = css({
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
  tourItemRoot,
  tourItemAnchor,
  tourItemPopover,
  tourItemContent,
  tourItemHeader,
  tourItemTitle,
  tourItemDismissIcon,
  tourItemBody,
  tourItemFooter,
  tourItemBackButton,
  tourItemNextButton,
  tourItemRoot as root,
  tourItemAnchor as anchor,
  tourItemPopover as popover,
  tourItemContent as content,
  tourItemHeader as header,
  tourItemTitle as title,
  tourItemDismissIcon as dismissIcon,
  tourItemBody as body,
  tourItemFooter as footer,
  tourItemBackButton as backButton,
  tourItemNextButton as nextButton,
};
