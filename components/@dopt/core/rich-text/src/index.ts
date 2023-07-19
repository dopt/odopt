export type Descendant = CustomElement | Text;

export type RichText = Descendant[];

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: Alignment;
  children: ListItemElement[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  align?: Alignment;
  children: ListItemElement[];
};

export type HeadingOneElement = {
  type: 'heading-one';
  align?: Alignment;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  align?: Alignment;
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: 'heading-three';
  align?: Alignment;
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  width?: string;
  height?: string;
  altText?: string;
  align?: Alignment;
  children: EmptyText[];
};

export type HeadingTypes =
  | HeadingOneElement['type']
  | HeadingTwoElement['type']
  | HeadingThreeElement['type'];

export type LinkElement = {
  type: 'link';
  url: string;
  children: Descendant[];
  align?: Alignment;
};

export type ListItemElement = { type: 'list-item'; children: Descendant[] };

export type ParagraphElement = {
  type: 'paragraph';
  align?: Alignment;
  children: Descendant[];
};

export type VideoElement = {
  type: 'video';
  url: string;
  width?: string;
  height?: string;
  align?: Alignment;
  children: EmptyText[];
};

export const LIST_TYPES = ['numbered-list', 'bulleted-list'] as const;
export const ALIGNMENT_TYPES = ['left', 'center', 'right', 'justify'] as const;

export type List = (typeof LIST_TYPES)[number];
export type Alignment = (typeof ALIGNMENT_TYPES)[number];

export type CustomElement =
  | BulletedListElement
  | NumberedListElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | LinkElement
  | ListItemElement
  | ParagraphElement
  | VideoElement;

export type Format =
  | 'heading'
  | keyof CustomText
  | CustomElement['type']
  | Alignment
  | 'clear-formatting'
  | 'align-text';

export type CustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  text: string;
};

export type EmptyText = {
  text: string;
};

export type Text = CustomText | EmptyText;
