import { CustomText, Descendant, TextAlignType } from '@dopt/core-rich-text';

import { CSSProperties, PropsWithChildren, ReactNode } from 'react';

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
  let style: CSSProperties = {};
  if ('align' in node) {
    style.textAlign = node.align as TextAlignType;
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

    return <span style={style}>{children}</span>;
  }

  let children: ReactNode[] | undefined;
  if ('children' in node) {
    children = node.children.map((node, index) => (
      <DescendantComponent key={`descendant-child-${index}`} node={node} />
    ));
  }

  if ('type' in node)
    switch (node.type) {
      case 'block-quote':
        return <blockquote style={style}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul style={style}>{children}</ul>;
      case 'numbered-list':
        return (
          <ol type="1" style={style}>
            {children}
          </ol>
        );
      case 'heading-one':
        return <h1 style={style}>{children}</h1>;
      case 'heading-two':
        return <h2 style={style}>{children}</h2>;
      case 'list-item':
        return <li style={style}>{children}</li>;
      default:
        return <p style={style}>{children}</p>;
    }
  return <p style={style}>{children}</p>;
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
