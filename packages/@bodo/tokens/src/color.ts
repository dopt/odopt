import {
  blue,
  brown,
  gray,
  green,
  orange,
  pink,
  purple,
  red,
  yellow,
  blueDark,
  brownDark,
  grayDark,
  greenDark,
  orangeDark,
  pinkDark,
  purpleDark,
  redDark,
  yellowDark,
} from '@radix-ui/colors';

export type Mode = 'light' | 'dark';

export type Color = keyof typeof colors['light'];

export const colors = {
  base: {
    black: 'rgb(0, 0, 0)',
    white: 'rgb(255, 255, 255)',
    transparent: 'transparent',
  },
  light: {
    ...blue,
    ...brown,
    ...gray,
    ...green,
    ...orange,
    ...pink,
    ...purple,
    ...red,
    ...yellow,
  },
  dark: {
    ...blueDark,
    ...brownDark,
    ...grayDark,
    ...greenDark,
    ...orangeDark,
    ...pinkDark,
    ...purpleDark,
    ...redDark,
    ...yellowDark,
  },
};
