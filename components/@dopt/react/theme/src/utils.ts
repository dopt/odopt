import { type CSSProperties } from 'react';
import { vars, type Theme } from '@dopt/core-theme';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export function themeStyle({
  theme,
  style,
}: {
  theme: Theme;
  style?: CSSProperties;
}): CSSProperties {
  return {
    ...(theme ? assignInlineVars(vars, theme) : undefined),
    ...style,
  };
}
