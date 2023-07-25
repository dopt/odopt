import { createGlobalTheme } from '@vanilla-extract/css';
import { vars } from './theme.css';
import { tokens } from './tokens';

createGlobalTheme(':root', vars, tokens);
