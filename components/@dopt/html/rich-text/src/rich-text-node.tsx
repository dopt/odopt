import type { Node, Alignment } from '@dopt/core-rich-text';
import { isTextNode, isVideoVendorUrl } from '@dopt/core-rich-text';
import { themes, classes } from '@dopt/core-rich-text';
import { clsx } from 'clsx';

const attributesToString = (attributes: Record<string, unknown>) => {
  return Object.entries(attributes)
    .filter(([_, value]: [string, unknown]) => {
      return value != null && value !== '';
    })
    .map(([key, value]: [string, unknown]) => {
      return `${key}="${value}"`;
    })
    .join(' ');
};

export interface RichTextNodeOptions {
  node: Node;
  noStyles?: boolean;
}

export const RichTextNode = (options: RichTextNodeOptions) => {
  const { node, noStyles } = options;

  const alignment =
    'align' in node
      ? clsx([
          noStyles ? null : themes.alignment(node.align as Alignment),
          classes.alignment(node.align as Alignment),
        ])
      : null;

  if (isTextNode(node)) {
    let children: string = node.text;

    if (node.bold) {
      children = `<strong class="${classes.text.bold}">${children}</strong>`;
    }

    if (node.italic) {
      children = `<em class="${classes.text.italic}">${children}</em>`;
    }

    if (node.underline) {
      children = `<u class="${classes.text.underline}">${children}</u>`;
    }

    return `<span class="${classes.text.root}">${children}</span>`;
  }

  let children = '';
  if ('children' in node) {
    children = node.children
      .map((descendant: Node) =>
        RichTextNode({
          node: descendant,
          noStyles,
        })
      )
      .join('');
  }

  if ('type' in node) {
    const elementClassNames = classes.element(node.type);
    const elementClassNamesWithAlignment = clsx([elementClassNames, alignment]);

    switch (node.type) {
      case 'bulleted-list':
        return `<ul class="${elementClassNamesWithAlignment}">${children}</ul>`;
      case 'numbered-list':
        return `<ol class="${elementClassNamesWithAlignment}">${children}</ol>`;
      case 'heading-one':
        return `<h1 class="${elementClassNamesWithAlignment}">${children}</h1>`;
      case 'heading-two':
        return `<h2 class="${elementClassNamesWithAlignment}">${children}</h2>`;
      case 'heading-three':
        return `<h3 class="${elementClassNamesWithAlignment}">${children}</h3>`;
      case 'list-item':
        return `<li class="${elementClassNamesWithAlignment}">${children}</li>`;
      case 'link':
        return `<a class="${elementClassNames}" href="${node.url}">${children}</a>`;
      case 'image':
        const image = `<img class="${
          classes.image.element
        }" ${attributesToString({
          src: node.url,
          alt: node.altText,
          height: node.height,
          width: node.width,
        })}></img>`;
        return `<div class="${clsx([
          classes.image.wrapper,
          alignment,
        ])}">${image}</div>`;
      case 'video':
        const video = isVideoVendorUrl(node.url)
          ? `<iframe class="${clsx([
              noStyles ? null : themes.video,
              classes.video.element,
            ])}" ${attributesToString({
              src: node.url,
              height: node.height,
              width: node.width,
              allow: 'autoplay; picture-in-picture; fullscreen',
            })}></iframe>`
          : `<video class="${clsx([
              noStyles ? null : themes.video,
              classes.video.element,
            ])}" ${attributesToString({
              src: node.url,
              height: node.height,
              width: node.width,
              controls: true,
            })}></video>`;
        return `<div class="${clsx([
          classes.video.wrapper,
          alignment,
        ])}">${video}</div>`;

      default:
        return `<p class="${elementClassNamesWithAlignment}">${children}</p>`;
    }
  }

  return null;
};
