import {} from '@stitches/core';
import { theme } from '@dopt/react-theme';

const { css, theme: vars } = theme;

const alignment = {
  horizontal: {
    start: {
      '&:before, &:after': {
        left: '$$arrowGap',
      },
    },
    center: {
      '&:before, &:after': {
        right: '$0',
        left: '$0',
        marginRight: '$auto',
        marginLeft: '$auto',
      },
    },
    end: {
      '&:before, &:after': {
        right: '$$arrowGap',
      },
    },
  },
  vertical: {
    start: {
      '&:before, &:after': {
        top: '$$arrowGap',
      },
    },
    center: {
      '&:before, &:after': {
        top: '$0',
        bottom: '$0',
        marginTop: '$auto',
        marginBottom: '$auto',
      },
    },
    end: {
      '&:before, &:after': {
        bottom: '$$arrowGap',
      },
    },
  },
};

const tourItemPopover = css({
  $$arrowSize: vars.sizes[3],
  $$arrowGap: vars.sizes[6],
  all: 'revert',
  position: 'absolute',
  fontFamily: '$sans',
  fontSize: '$base',
  color: '$content',
  lineHeight: '$base',
  '&, & *': {
    boxSizing: 'border-box',
  },
  '&:before, &:after': {
    content: '',
    position: 'absolute',
    zIndex: 1,
    width: '$$arrowSize',
    height: '$$arrowSize',
  },
  '&:before': {
    background: '$border',
  },
  '&:after': {
    background: '$background',
  },
  variants: {
    position: {
      bottom: {
        '&:before, &:after': {
          top: 'calc(-$$arrowSize / 2)',
          clipPath: 'polygon(50% 0, 100% 50%, 0 50%)',
        },
        '&:after': {
          translate: `0 ${vars.borderWidths[1]}`,
        },
      },
      left: {
        '&:before, &:after': {
          right: 'calc(-$$arrowSize / 2)',
          clipPath: 'polygon(50% 100%, 100% 50%, 50% 0)',
        },
        '&:after': {
          translate: `calc(${vars.borderWidths[1]} * -1) 0`,
        },
      },
      top: {
        '&:before, &:after': {
          bottom: 'calc(-$$arrowSize / 2)',
          clipPath: 'polygon(50% 100%, 0 50%, 100% 50%)',
        },
        '&:after': {
          translate: `0 calc(${vars.borderWidths[1]} * -1)`,
        },
      },
      right: {
        '&:before, &:after': {
          left: 'calc(-$$arrowSize / 2)',
          clipPath: 'polygon(50% 100%, 0 50%, 50% 0)',
        },
        '&:after': {
          translate: `${vars.borderWidths[1]} 0`,
        },
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
      position: 'top',
      alignment: 'start',
      css: alignment.horizontal.start,
    },
    {
      position: 'top',
      alignment: 'center',
      css: alignment.horizontal.center,
    },
    {
      position: 'top',
      alignment: 'end',
      css: alignment.horizontal.end,
    },

    {
      position: 'bottom',
      alignment: 'start',
      css: alignment.horizontal.start,
    },
    {
      position: 'bottom',
      alignment: 'center',
      css: alignment.horizontal.center,
    },
    {
      position: 'bottom',
      alignment: 'end',
      css: alignment.horizontal.end,
    },

    {
      position: 'right',
      alignment: 'start',
      css: alignment.vertical.start,
    },
    {
      position: 'right',
      alignment: 'center',
      css: alignment.vertical.center,
    },
    {
      position: 'right',
      alignment: 'end',
      css: alignment.vertical.end,
    },

    {
      position: 'left',
      alignment: 'start',
      css: alignment.vertical.start,
    },
    {
      position: 'left',
      alignment: 'center',
      css: alignment.vertical.center,
    },
    {
      position: 'left',
      alignment: 'end',
      css: alignment.vertical.end,
    },
  ],
});

const tourItemContent = css({
  all: 'unset',
  position: 'relative',
  display: 'block',
  width: 300,
  padding: '$6',
  borderWidth: '$1',
  borderStyle: 'solid',
  borderColor: '$border',
  borderRadius: '$2',
  boxShadow: '$1',
  backgroundColor: '$background',
  '&:focus': { outline: 'none' },
});

const tourItemHeader = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingBottom: '$2',
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

const tourItemBody = css({
  all: 'unset',
  display: 'block',
});

const tourItemFooter = css({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  gap: '$2',
  paddingTop: '$2',
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
  tourItemPopover,
  tourItemContent,
  tourItemHeader,
  tourItemTitle,
  tourItemDismissIcon,
  tourItemBody,
  tourItemFooter,
  tourItemBackButton,
  tourItemNextButton,
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
