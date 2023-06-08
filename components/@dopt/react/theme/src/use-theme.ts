import { useContext } from 'react';
import { ThemeContext } from './context';
import type { StyleTheme } from './types';

export function useTheme(theme: StyleTheme): StyleTheme {
  const parentTheme = useContext(ThemeContext);
  return theme !== undefined ? theme : parentTheme;
}
