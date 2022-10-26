export const breakpoints = {
  sm: 540,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1400,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export const breakpointNames = Object.keys(breakpoints) as Breakpoint[];
