import { globalStyle } from '@vanilla-extract/css';
import { themes } from './const';

globalStyle(`.${themes.root} > *:first-child`, {
  marginBlockStart: 0,
});

globalStyle(`.${themes.root} > *:last-child`, {
  marginBlockEnd: 0,
});

globalStyle(`.${themes.root} .${themes.alignment('left')}`, {
  textAlign: 'left',
});

globalStyle(`.${themes.root} .${themes.alignment('right')}`, {
  textAlign: 'right',
});

globalStyle(`.${themes.root} .${themes.alignment('center')}`, {
  textAlign: 'center',
});

globalStyle(`.${themes.root} .${themes.alignment('justify')}`, {
  textAlign: 'justify',
});

globalStyle(`.${themes.root} .${themes.video}`, {
  border: 0,
});
