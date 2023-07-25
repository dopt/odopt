import { useContext } from 'react';
import { ThemeContext } from './context';
import { type Theme } from '@dopt/core-theme';

export function useTheme(theme: Theme, inheritParentTheme = false): Theme {
  const parentTheme = useContext(ThemeContext);

  if (theme === undefined) {
    if (inheritParentTheme) {
      return parentTheme;
    }

    if (parentTheme === null) {
      return null;
    }
  }

  return theme;
}
