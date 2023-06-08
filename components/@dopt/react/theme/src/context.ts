import { createContext } from 'react';
import type { StyleTheme } from './types';

export const ThemeContext = createContext<StyleTheme>(undefined);
