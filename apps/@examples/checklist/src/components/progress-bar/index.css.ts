import { style } from '@vanilla-extract/css';

export const progressBarClass = style({
  position: 'relative',
  overflow: 'hidden',
  background: '#E9ECEF',
  borderRadius: '99999px',
  width: '100%',
  height: '13px',
});

export const indicatorContainerClass = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const progressIndicatorClass = style({
  backgroundColor: '#339AF0',
  width: '100%',
  height: '100%',
  transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});
