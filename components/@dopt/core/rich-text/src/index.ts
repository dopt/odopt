export type Descendant = CustomElement | Text;

export type RichText = Descendant[];

export type BlockQuoteElement = {
  type: 'block-quote';
  align?: string;
  children: Descendant[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: ListItemElement[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  align?: string;
  children: ListItemElement[];
};

export type CheckListItemElement = {
  type: 'check-list-item';
  align?: string;
  checked: boolean;
  children: Descendant[];
};

export type EditableVoidElement = {
  type: 'editable-void';
  children: EmptyText[];
};

export type HeadingElement = {
  type: 'heading';
  align?: string;
  children: Descendant[];
};

export type HeadingOneElement = {
  type: 'heading-one';
  align?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: 'heading-two';
  align?: string;
  children: Descendant[];
};

export type HeadingThreeElement = {
  type: 'heading-three';
  align?: string;
  children: Descendant[];
};

export type ImageElement = {
  type: 'image';
  url: string;
  width?: string;
  height?: string;
  altText?: string;
  children: EmptyText[];
};

export type HeadingTypes =
  | HeadingOneElement['type']
  | HeadingTwoElement['type']
  | HeadingThreeElement['type'];

export type LinkElement = { type: 'link'; url: string; children: Descendant[] };

export type ButtonElement = { type: 'button'; children: Descendant[] };

export type BadgeElement = { type: 'badge'; children: Descendant[] };

export type ListItemElement = { type: 'list-item'; children: Descendant[] };

export type MentionElement = {
  type: 'mention';
  character: string;
  children: CustomText[];
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: Descendant[];
};

export type TitleElement = { type: 'title'; children: Descendant[] };

export type VideoElement = {
  type: 'video';
  url: string;
  width?: string;
  height?: string;
  children: EmptyText[];
};

export type CodeBlockElement = {
  type: 'code-block';
  language: string;
  children: Descendant[];
};

export type CodeLineElement = {
  type: 'code-line';
  children: Descendant[];
};

export const LIST_TYPE = ['numbered-list', 'bulleted-list'] as const;
export const TEXT_ALIGN_TYPE = ['left', 'center', 'right', 'justify'] as const;

export type ListType = (typeof LIST_TYPE)[number];
export type TextAlignType = (typeof TEXT_ALIGN_TYPE)[number];

export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | NumberedListElement
  | EditableVoidElement
  | HeadingElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | LinkElement
  | ButtonElement
  | BadgeElement
  | ListItemElement
  | MentionElement
  | ParagraphElement
  | TitleElement
  | VideoElement
  | CodeBlockElement
  | CodeLineElement;

export type Format =
  | keyof CustomText
  | CustomElement['type']
  | TextAlignType
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
