import { Descendant } from '@dopt/core-rich-text';
import { PropsWithChildren, ReactNode } from 'react';

import { alignClass, imageContainerClass } from './styles';

import { cls } from '@dopt/react-theme';

import { classNameRoot } from './const';

import { isTextNode } from './util';

export interface RichTextNodeProps {
  node: Descendant;
  key?: string;
}

export const RichTextNode = ({
  node,
}: PropsWithChildren<RichTextNodeProps>): JSX.Element => {
  let baseAlign = '';
  if ('align' in node) {
    const textAlign = node.align;
    baseAlign = alignClass({ [textAlign as string]: true });
  }

  if (isTextNode(node)) {
    let children: ReactNode = node.text;

    if (node.bold) {
      children = <strong>{children}</strong>;
    }

    if (node.code) {
      children = <code>{children}</code>;
    }

    if (node.italic) {
      children = <em>{children}</em>;
    }

    if (node.underline) {
      children = <u>{children}</u>;
    }

    return (
      <span className={cls([`${classNameRoot}__text`, baseAlign])}>
        {children}
      </span>
    );
  }

  let children: ReactNode[] | undefined;
  if ('children' in node) {
    children = node.children.map((node: Descendant, index: number) => (
      <RichTextNode key={`${classNameRoot}__descendant-${index}`} node={node} />
    ));
  }

  if ('type' in node)
    switch (node.type) {
      case 'block-quote':
        return (
          <blockquote
            className={cls([`${classNameRoot}__${node.type}`, baseAlign])}
          >
            {children}
          </blockquote>
        );
      case 'bulleted-list':
        return (
          <ul className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
          </ul>
        );
      case 'numbered-list':
        return (
          <ol className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
          </ol>
        );
      case 'heading-one':
        return (
          <h1 className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
          </h1>
        );
      case 'heading-two':
        return (
          <h2 className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
          </h2>
        );
      case 'list-item':
        return (
          <li className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
          </li>
        );
      case 'link':
        return (
          <a
            href={node.url}
            className={cls([`${classNameRoot}__${node.type}`])}
          >
            {children}
          </a>
        );
      case 'image':
        return (
          <div className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
            <div className={imageContainerClass()}>
              <img
                src={node.url}
                alt={node.altText}
                height={node.height}
                width={node.width}
              />
            </div>
          </div>
        );
      case 'video':
        return (
          <div className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            <div>
              <iframe src={node.url} width={node.width} height={node.height} />
            </div>
            {children}
          </div>
        );
      default:
        return (
          <p className={cls([`${classNameRoot}__${node.type}`, baseAlign])}>
            {children}
          </p>
        );
    }
  return (
    <p className={cls([`${classNameRoot}__container`, baseAlign])}>
      {children}
    </p>
  );
};
