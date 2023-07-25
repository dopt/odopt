import { tokens as defaultTokens, type Tokens } from './tokens';
import type { DeepPartial } from './types';
import merge from 'lodash.merge';

export function createTheme(tokens: DeepPartial<Tokens>): Tokens {
  return merge(defaultTokens, tokens);
}
