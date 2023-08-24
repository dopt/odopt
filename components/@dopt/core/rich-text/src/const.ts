import type { Alignment, Element } from './types';

const themePrefix = 'dopt-rich-text-theme';

export const themes = {
  root: `${themePrefix}-root`,
  video: `${themePrefix}-video`,
  alignment: (align: Alignment) => `${themePrefix}-${align}-alignment`,
};

const classRoot = 'dopt-rich-text';
const nodeRoot = `${classRoot}__node`;

const alignmentClasses = (align: Alignment) => `${nodeRoot}-align-${align}`;
const elementClasses = (type: Element['type']) =>
  `${nodeRoot} ${classRoot}__${type}`;

export const classes = {
  root: classRoot,
  alignment: alignmentClasses,
  text: {
    root: nodeRoot,
    bold: `${nodeRoot} ${classRoot}__bold`,
    italic: `${nodeRoot} ${classRoot}__italic`,
    underline: `${nodeRoot} ${classRoot}__underline`,
  },
  element: elementClasses,
  image: {
    wrapper: `${elementClasses('image')}-wrapper`,
    element: `${classRoot}__image`,
  },
  video: {
    wrapper: `${elementClasses('video')}-wrapper`,
    element: `${classRoot}__video`,
  },
};
