import type { Children, Node } from '@dopt/core-rich-text';
import { RichTextNode } from './rich-text-node';
import { clsx } from 'clsx';
import { themes, classes } from '@dopt/core-rich-text';

export interface RichTextOptions {
  content?: Children | null;
  noStyles?: boolean;
  className?: string;
}

function RichText(options: RichTextOptions) {
  const { content, noStyles, className } = options;

  if (!content) {
    return '';
  }

  const rootClass = clsx([
    noStyles ? null : themes.root,
    classes.root,
    className,
  ]);

  const children = content
    .map((descendant: Node) =>
      RichTextNode({
        node: descendant,
        noStyles,
      })
    )
    .join('');

  return `<div class="${rootClass}">${children}</div>`;
}

export { RichText };
