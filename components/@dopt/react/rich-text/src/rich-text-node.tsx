import React, { type ReactNode } from 'react';
import type { Node, Alignment } from '@dopt/core-rich-text';
import { isTextNode } from '@dopt/core-rich-text';
import { themes, classes } from '@dopt/core-rich-text';
import { clsx } from 'clsx';

export interface RichTextNodeProps {
  children?: ReactNode;
  node: Node;
  noStyles?: boolean;
}

export const RichTextNode = (props: RichTextNodeProps) => {
  const { node, noStyles } = props;

  const alignment =
    'align' in node
      ? clsx([
          noStyles ? null : themes.alignment(node.align as Alignment),
          classes.alignment(node.align as Alignment),
        ])
      : null;

  if (isTextNode(node)) {
    let children: ReactNode = node.text;

    if (node.bold) {
      children = <strong className={classes.text.bold}>{children}</strong>;
    }

    if (node.italic) {
      children = <em className={classes.text.italic}>{children}</em>;
    }

    if (node.underline) {
      children = <u className={classes.text.underline}>{children}</u>;
    }

    return <span className={classes.text.root}>{children}</span>;
  }

  let children: ReactNode[] | undefined;
  if ('children' in node) {
    children = node.children.map((node: Node, index) => (
      <RichTextNode key={`${classes.root}__descendant-${index}`} node={node} />
    ));
  }

  if ('type' in node) {
    const elementClassNames = classes.element(node.type);

    switch (node.type) {
      case 'bulleted-list':
        return (
          <ul className={clsx([elementClassNames, alignment])}>{children}</ul>
        );
      case 'numbered-list':
        return (
          <ol className={clsx([elementClassNames, alignment])}>{children}</ol>
        );
      case 'heading-one':
        return (
          <h1 className={clsx([elementClassNames, alignment])}>{children}</h1>
        );
      case 'heading-two':
        return (
          <h2 className={clsx([elementClassNames, alignment])}>{children}</h2>
        );
      case 'heading-three':
        return (
          <h3 className={clsx([elementClassNames, alignment])}>{children}</h3>
        );
      case 'list-item':
        return (
          <li className={clsx([elementClassNames, alignment])}>{children}</li>
        );
      case 'link':
        return (
          <a href={node.url} className={elementClassNames}>
            {children}
          </a>
        );
      case 'image':
        return (
          <div className={clsx([classes.image.wrapper, alignment])}>
            <img
              src={node.url}
              alt={node.altText}
              height={node.height}
              width={node.width}
              className={classes.image.element}
            />
          </div>
        );
      case 'video':
        return (
          <div className={clsx([classes.video.wrapper, alignment])}>
            <iframe
              src={node.url}
              width={node.width}
              height={node.height}
              allowFullScreen
              allow="autoplay; picture-in-picture; fullscreen"
              className={clsx([
                noStyles ? null : themes.video,
                classes.video.element,
              ])}
            />
          </div>
        );
      default:
        return (
          <p className={clsx([elementClassNames, alignment])}>{children}</p>
        );
    }
  }

  return null;
};
