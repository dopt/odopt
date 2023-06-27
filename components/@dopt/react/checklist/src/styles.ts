import {} from '@stitches/core';
import { theme } from '@dopt/react-theme';

const { css } = theme;

const checklistRoot = css({
  all: 'revert',
  padding: '$6',
  borderWidth: '$2',
  borderStyle: 'solid',
  borderColor: '$border',
  borderRadius: '$2',
  fontFamily: '$sans',
  fontSize: '$base',
  color: '$content',
  lineHeight: '$base',
  background: '$background',
  '&, & *': {
    boxSizing: 'border-box',
  },
});

const checklistHeader = css({
  all: 'unset',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  paddingBottom: '$1',
});

const checklistTitle = css({
  all: 'unset',
  fontSize: '$md',
  fontWeight: '$bold',
  lineHeight: '$md',
});

const checklistBody = css({
  paddingBottom: '$4',
});

const checklistDismissIcon = css({
  all: 'unset',
  padding: '$1',
  borderRadius: '$2',
  alignSelf: 'start',
  color: '$secondary',
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

const checklistProgress = css({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  paddingBottom: '$4',
});

const checklistProgressMeter = css({
  all: 'unset',
  display: 'block',
  height: '$2',
  flexGrow: 1,
  borderRadius: '$1',
  backgroundColor: '$secondaryLight',
});

const checklistProgressMeterBar = css({
  all: 'unset',
  display: 'block',
  width: '$0',
  height: '$2',
  flexShrink: 0,
  borderRadius: '$1',
  backgroundColor: '$primary',
  transition: 'width $ease',
});

const checklistProgressContent = css({
  all: 'unset',
  fontSize: '$sm',
  lineHeight: '$sm',
});

const checklistItems = css({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  listStyle: 'none',
});

const checklistItem = css({
  all: 'unset',
  display: 'flex',
  gap: '$3',
  paddingBottom: '$6',
  borderBottomWidth: '$1',
  borderBottomStyle: 'solid',
  borderBottomColor: '$border',
  '&:last-child': {
    borderBottomWidth: '$0',
    paddingBottom: '$0',
  },
});

const checklistItemIcon = css({
  all: 'unset',
  flexShrink: 0,
  variants: {
    completed: {
      true: {
        color: '$primary',
      },
    },
    skipped: {
      true: {
        color: '$contentLight',
      },
    },
  },
});

const checklistItemContent = css({
  all: 'unset',
  flexGrow: 1,
});

const checklistItemTitle = css({
  all: 'unset',
  display: 'block',
  fontWeight: '$medium',
  variants: {
    completed: {
      true: {
        color: '$contentLight',
        textDecoration: 'line-through',
      },
    },
    skipped: {
      true: {
        color: '$contentLight',
        textDecoration: 'line-through',
      },
    },
  },
});

const checklistItemBody = css({
  all: 'unset',
  display: 'block',
  fontSize: '$sm',
  lineHeight: '$sm',
  variants: {
    completed: {
      true: {
        color: '$contentLight',
      },
    },
    skipped: {
      true: {
        color: '$contentLight',
      },
    },
  },
});

const checklistItemCompleteButton = css({
  all: 'unset',
  padding: '$2 $3',
  borderRadius: '$2',
  marginTop: '$3',
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

const checklistItemSkipIcon = css({
  all: 'unset',
  flexShrink: 0,
  padding: '$1',
  borderRadius: '$2',
  alignSelf: 'start',
  color: '$secondary',
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

export {
  checklistRoot,
  checklistHeader,
  checklistTitle,
  checklistBody,
  checklistDismissIcon,
  checklistProgress,
  checklistProgressMeter,
  checklistProgressMeterBar,
  checklistProgressContent,
  checklistItems,
  checklistItem,
  checklistItemIcon,
  checklistItemContent,
  checklistItemTitle,
  checklistItemBody,
  checklistItemCompleteButton,
  checklistItemSkipIcon,
  checklistRoot as root,
  checklistHeader as header,
  checklistTitle as title,
  checklistBody as body,
  checklistDismissIcon as dismissIcon,
  checklistProgress as progress,
  checklistProgressMeter as progressMeter,
  checklistProgressMeterBar as progressMeterBar,
  checklistProgressContent as progressContent,
  checklistItems as items,
  checklistItem as item,
  checklistItemIcon as itemIcon,
  checklistItemContent as itemContent,
  checklistItemTitle as itemTitle,
  checklistItemBody as itemBody,
  checklistItemCompleteButton as itemCompleteButton,
  checklistItemSkipIcon as itemSkipIcon,
};
