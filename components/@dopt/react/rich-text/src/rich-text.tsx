import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from 'react';
import type { Children, Node } from '@dopt/core-rich-text';
import { RichTextNode } from './rich-text-node';
import { clsx } from 'clsx';
import { themes, classes } from '@dopt/core-rich-text';

export interface RichTextProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children?: Children | null;
  noStyles?: boolean;
}

function RichText(props: RichTextProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { children, noStyles, className, ...restProps } = props;

  if (!children) {
    return null;
  }

  return (
    <div
      className={clsx([noStyles ? null : themes.root, classes.root, className])}
      {...restProps}
      ref={ref}
    >
      {children.map((descendant: Node, index: number) => (
        <RichTextNode
          key={`${classes.root}__descendant-${index}`}
          node={descendant}
          noStyles={noStyles}
        />
      ))}
    </div>
  );
}

const Component = forwardRef(RichText);

export { Component as RichText };
