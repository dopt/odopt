import { type Tokens } from './tokens';

export type Theme = Tokens | null | undefined;

export interface StyleProps {
  theme?: Theme;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
