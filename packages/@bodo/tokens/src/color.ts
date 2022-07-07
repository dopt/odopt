export type Mode = 'light' | 'dark';

export type Color = keyof typeof colors['light'];

const blurple = {
  blurple50: '#f1edfd',
  blurple100: '#e2dafb',
  blurple200: '#c6b5f7',
  blurple300: '#a991f3',
  blurple400: '#8d6cef',
  blurple500: '#7047eb',
  blurple600: '#5a39be',
  blurple700: '#442b91',
  blurple800: '#2f1d63',
  blurple900: '#190f36',
};

const ultramarine = {
  ultramarine50: '#ded3f4',
  ultramarine100: '#cdbdec',
  ultramarine200: '#aa93db',
  ultramarine300: '#8868cb',
  ultramarine400: '#653eba',
  ultramarine500: '#4313aa',
  ultramarine600: '#360f88',
  ultramarine700: '#280b66',
  ultramarine800: '#1b0844',
  ultramarine900: '#0d0422',
};

const burntOrange = {
  burntOrange50: '#fdece7',
  burntOrange100: '#fadad0',
  burntOrange200: '#f5b5a1',
  burntOrange300: '#f18f71',
  burntOrange400: '#ec6a42',
  burntOrange500: '#e74513',
  burntOrange600: '#b9370f',
  burntOrange700: '#8b290b',
  burntOrange800: '#5c1c08',
  burntOrange900: '#2e0e04',
};

const sunGlow = {
  sunGlow50: '#fff9ea',
  sunGlow100: '#fff3d5',
  sunGlow200: '#ffe7ab',
  sunGlow300: '#ffdb80',
  sunGlow400: '#ffcf56',
  sunGlow500: '#ffc32c',
  sunGlow600: '#cd9c23',
  sunGlow700: '#9a761a',
  sunGlow800: '#684f12',
  sunGlow900: '#352909',
};

const sky = {
  sky50: '#f2fbff',
  sky100: '#e4f7ff',
  sky200: '#c9efff',
  sky300: '#afe8ff',
  sky400: '#94e0ff',
  sky500: '#79d8ff',
  sky600: '#61b8dc',
  sky700: '#4998b9',
  sky800: '#307996',
  sky900: '#185973',
};

const midnight = {
  midnight50: '#678edb',
  midnight100: '#5c81c9',
  midnight200: '#4766a3',
  midnight300: '#314b7e',
  midnight400: '#1c3058',
  midnight500: '#061533',
  midnight600: '#051129',
  midnight700: '#040d1f',
  midnight800: '#020814',
  midnight900: '#01040a',
};

const conifer = {
  conifer50: '#f8fff1',
  conifer100: '#f2ffe2',
  conifer200: '#e4ffc6',
  conifer300: '#d7ffa9',
  conifer400: '#c9ff8d',
  conifer500: '#bcff70',
  conifer600: '#9eda5a',
  conifer700: '#80b543',
  conifer800: '#62912d',
  conifer900: '#446c16',
};

const gray = {
  gray50: '#f6f6f6',
  gray100: '#ededed',
  gray200: '#dadada',
  gray300: '#c8c8c8',
  gray400: '#b5b5b5',
  gray500: '#a3a3a3',
  gray600: '#919191',
  gray700: '#7e7e7e',
  gray800: '#6c6c6c',
  gray900: '#595959',
};

export const colors = {
  base: {
    black: '#000',
    white: '#fff',
    transparent: 'transparent',
  },
  light: {
    ...blurple,
    ...ultramarine,
    ...burntOrange,
    ...sunGlow,
    ...sky,
    ...midnight,
    ...conifer,
    ...gray,
  },
  dark: {
    ...blurple,
    ...ultramarine,
    ...burntOrange,
    ...sunGlow,
    ...sky,
    ...midnight,
    ...conifer,
    ...gray,
  },
};
