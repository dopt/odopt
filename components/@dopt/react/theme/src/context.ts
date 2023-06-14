import { createContext } from 'react';
import type { StyleTheme } from '@dopt/core-theme';

export const ThemeContext = createContext<StyleTheme>(undefined);
