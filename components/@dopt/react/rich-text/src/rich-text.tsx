import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { type Descendant } from '@dopt/core-rich-text';
import { RichTextNode } from './rich-text-node';
import { cls } from '@dopt/react-theme';
import { classNameRoot } from './const';
import { richTextRoot } from './styles';

const richTextClassName = classNameRoot;

export interface RichTextProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children?: Descendant[] | null;
  noStyles?: boolean;
}

function RichText(props: RichTextProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { children, noStyles, className, ...restProps } = props;

  if (!children) {
    return null;
  }

  return (
    <div
      className={cls([
        noStyles ? null : richTextRoot(),
        richTextClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children.map((descendant: Descendant, index: number) => (
        <RichTextNode
          key={`${classNameRoot}__descendant-${index}`}
          node={descendant}
          noStyles={noStyles}
        />
      ))}
    </div>
  );
}

const Root = forwardRef(RichText);
export { Root as RichText };
