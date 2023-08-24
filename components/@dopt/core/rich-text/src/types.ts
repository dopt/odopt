export type Node = Element | Text;

export type Children = Node[];

export interface Text {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  text: string;
}

export type Element =
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ParagraphElement
  | ListItemElement
  | BulletedListElement
  | NumberedListElement
  | ImageElement
  | LinkElement
  | VideoElement;

export interface HeadingOneElement {
  type: 'heading-one';
  align?: Alignment;
  children: Children;
}

export interface HeadingTwoElement {
  type: 'heading-two';
  align?: Alignment;
  children: Children;
}

export interface HeadingThreeElement {
  type: 'heading-three';
  align?: Alignment;
  children: Children;
}

export type HeadingType =
  | HeadingOneElement['type']
  | HeadingTwoElement['type']
  | HeadingThreeElement['type'];

export interface ParagraphElement {
  type: 'paragraph';
  align?: Alignment;
  children: Children;
}

export interface ListItemElement {
  type: 'list-item';
  children: Children;
}

export interface BulletedListElement {
  type: 'bulleted-list';
  align?: Alignment;
  children: ListItemElement[];
}

export interface NumberedListElement {
  type: 'numbered-list';
  align?: Alignment;
  children: ListItemElement[];
}

export interface ImageElement {
  type: 'image';
  url: string;
  width?: string;
  height?: string;
  altText?: string;
  align?: Alignment;
  children: Text[];
}

export interface LinkElement {
  type: 'link';
  url: string;
  children: Children;
  align?: Alignment;
}

export interface VideoElement {
  type: 'video';
  url: string;
  width?: string;
  height?: string;
  align?: Alignment;
  children: Text[];
}

export const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
export type List = (typeof LIST_TYPES)[number];

export const ALIGNMENT_TYPES = ['left', 'center', 'right', 'justify'] as const;
export type Alignment = (typeof ALIGNMENT_TYPES)[number];

export type Format =
  | 'heading'
  | keyof Text
  | Element['type']
  | Alignment
  | 'clear-formatting'
  | 'align-text';
