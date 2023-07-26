import { createContext } from 'react';
import { type Theme } from '@dopt/core-theme';

export const ThemeContext = createContext<Theme>(undefined);
