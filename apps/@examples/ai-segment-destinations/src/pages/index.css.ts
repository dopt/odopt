import { style, globalStyle } from '@vanilla-extract/css';

globalStyle('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
});

export const example = style({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
});

export const navigation = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgb(16, 24, 64)',
  color: 'rgb(216, 218, 229)',
  alignItems: 'left',
  justifyContent: 'space-between',
  width: '224px',
  flexShrink: 0,
  gap: '18px',
  borderRight: '1px solid var(--color-border)',
});

export const topNav = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
});

export const footerNav = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '16px 12px',
  gap: '16px',
});

export const user = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
});

export const destinations = style({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
});

export const destinationsHeader = style({
  boxShadow: 'rgb(216, 218, 229) 0px 0px 0px 1px',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: 'rgb(249, 250, 252)',
  padding: '1rem 3rem',
  height: '64px',
  maxHeight: '64px',
});

export const checklist = style({});

export const onboardingHubRightPane = style({
  display: 'flex',
  gap: '12px',
  flexDirection: 'column',
  padding: '0 24px',
});

export const resourceList = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '10px',
  gap: '10px',
});

export const resourceLink = style({
  display: 'flex',
  flexDirection: 'row',
  textDecoration: 'none',
  color: 'var(--color-text)',
  gap: '5px',
  ':link': {
    textDecoration: 'none',
  },
  ':visited': {
    textDecoration: 'none',
  },
});

export const demoVideo = style({});

export const resources = style({});
