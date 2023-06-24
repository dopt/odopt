import { CustomText, Descendant, TextAlignType } from '@dopt/core-rich-text';

import { PropsWithChildren, ReactNode } from 'react';
import { alignClass, imageContainerClass } from './styles';

export interface DescendantProps {
  node: Descendant;
  key?: string;
}

export interface RichTextComponentProps {
  descendants: Descendant[];
}

export const DescendantComponent = ({
  node,
}: PropsWithChildren<DescendantProps>): JSX.Element => {
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

    return <span className={baseAlign}>{children}</span>;
  }

  let children: ReactNode[] | undefined;
  if ('children' in node) {
    children = node.children.map((node: Descendant, index: number) => (
      <DescendantComponent key={`descendant-child-${index}`} node={node} />
    ));
  }

  if ('type' in node)
    switch (node.type) {
      case 'block-quote':
        return <blockquote className={baseAlign}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul className={baseAlign}>{children}</ul>;
      case 'numbered-list':
        return <ol className={baseAlign}>{children}</ol>;
      case 'heading-one':
        return <h1 className={baseAlign}>{children}</h1>;
      case 'heading-two':
        return <h2 className={baseAlign}>{children}</h2>;
      case 'list-item':
        return <li className={baseAlign}>{children}</li>;
      case 'link':
        return <a href={node.url}>{children}</a>;
      case 'image':
        return (
          <div>
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
          <div>
            <div>
              <iframe src={node.url} width={node.width} height={node.height} />
            </div>
            {children}
          </div>
        );
      default:
        return <p className={baseAlign}>{children}</p>;
    }
  return <p className={baseAlign}>{children}</p>;
};

export const RichTextComponent = ({
  descendants,
}: PropsWithChildren<RichTextComponentProps>): JSX.Element => {
  return (
    <div>
      {descendants.map((descendant: Descendant, index: number) => (
        <DescendantComponent key={`descendant-${index}`} node={descendant} />
      ))}
    </div>
  );
};

const isTextNode = (node: Descendant): node is CustomText => {
  return 'text' in node;
};
