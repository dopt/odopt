import { type ReactNode } from 'react';
import { type Descendant, type Alignment } from '@dopt/core-rich-text';
import * as classes from './styles.css';
import { clsx } from 'clsx';
import { classNameRoot } from './const';
import { isTextNode } from './util';

export interface RichTextNodeProps {
  children?: ReactNode;
  node: Descendant;
  noStyles?: boolean;
}

export const RichTextNode = (props: RichTextNodeProps) => {
  const { node, noStyles } = props;

  const alignment =
    'align' in node
      ? clsx([
          noStyles
            ? null
            : classes.richTextAlignment({
                align: node.align as Alignment,
              }),
          `${classNameRoot}__node--align-${node.align}`,
        ])
      : null;

  if (isTextNode(node)) {
    let children: ReactNode = node.text;
    const commonClassNames = `${classNameRoot}__node`;

    if (node.bold) {
      children = (
        <strong className={`${commonClassNames} ${classNameRoot}__bold`}>
          {children}
        </strong>
      );
    }

    if (node.italic) {
      children = (
        <em className={`${commonClassNames} ${classNameRoot}__italic`}>
          {children}
        </em>
      );
    }

    if (node.underline) {
      children = (
        <u className={`${commonClassNames} ${classNameRoot}__underline`}>
          {children}
        </u>
      );
    }

    return <span className={commonClassNames}>{children}</span>;
  }

  let children: ReactNode[] | undefined;
  if ('children' in node) {
    children = node.children.map((node: Descendant, index) => (
      <RichTextNode key={`${classNameRoot}__descendant-${index}`} node={node} />
    ));
  }

  if ('type' in node) {
    const commonClassNames = `${classNameRoot}__node ${classNameRoot}__${node.type}`;

    switch (node.type) {
      case 'bulleted-list':
        return (
          <ul className={clsx([commonClassNames, alignment])}>{children}</ul>
        );
      case 'numbered-list':
        return (
          <ol className={clsx([commonClassNames, alignment])}>{children}</ol>
        );
      case 'heading-one':
        return (
          <h1 className={clsx([commonClassNames, alignment])}>{children}</h1>
        );
      case 'heading-two':
        return (
          <h2 className={clsx([commonClassNames, alignment])}>{children}</h2>
        );
      case 'heading-three':
        return (
          <h3 className={clsx([commonClassNames, alignment])}>{children}</h3>
        );
      case 'list-item':
        return (
          <li className={clsx([commonClassNames, alignment])}>{children}</li>
        );
      case 'link':
        return (
          <a href={node.url} className={commonClassNames}>
            {children}
          </a>
        );
      case 'image':
        return (
          <div className={clsx([`${commonClassNames}-wrapper`, alignment])}>
            <img
              src={node.url}
              alt={node.altText}
              height={node.height}
              width={node.width}
              className={`${classNameRoot}__${node.type}`}
            />
          </div>
        );
      case 'video':
        return (
          <div className={clsx([`${commonClassNames}-wrapper`, alignment])}>
            <iframe
              src={node.url}
              width={node.width}
              height={node.height}
              allowFullScreen
              allow="autoplay; picture-in-picture; fullscreen"
              className={clsx([
                noStyles ? null : classes.richTextVideo,
                `${classNameRoot}__${node.type}`,
              ])}
            />
          </div>
        );
      default:
        return (
          <p className={clsx([commonClassNames, alignment])}>{children}</p>
        );
    }
  }

  return null;
};
