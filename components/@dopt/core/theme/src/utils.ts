import type { Theme } from './types';
import clsx, { type ClassValue } from 'clsx';

export function themeClassName({
  theme,
  className,
}: {
  theme: Theme;
  className: ClassValue;
}) {
  return clsx(theme !== null ? className : null);
}
