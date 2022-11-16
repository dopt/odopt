import type { Block } from './';

export interface Entry extends Block<'entry'> {
  expression: string;
}
