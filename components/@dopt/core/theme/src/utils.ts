import type { StyleTheme } from './types';

export type ClassName = HTMLElement['className'] | null | undefined;

export function cls(className: ClassName | ClassName[]) {
  if (Array.isArray(className)) {
    return className.filter(Boolean).join(' ').trim();
  }
  return className ? className : '';
}

export function getThemeClassName({
  theme,
  className,
}: {
  theme: StyleTheme;
  className: ClassName | ClassName[];
}) {
  return cls(theme !== null ? className : null);
}
