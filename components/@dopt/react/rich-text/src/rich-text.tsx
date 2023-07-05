import { Descendant } from '@dopt/core-rich-text';
import { RichTextNode } from './rich-text-node';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithoutRef,
} from 'react';
import {
  cls,
  type StyleProps,
  ThemeContext,
  getThemeClassName,
} from '@dopt/react-theme';

import { classNameRoot } from './const';
const richTextClassName = classNameRoot;

export interface RichTextProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'>,
    StyleProps {
  children: Descendant[] | null;
}

function RichText(props: RichTextProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { children, theme, className, ...restProps } = props;

  if (!children) {
    return null;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={cls([
          getThemeClassName({
            theme,
            className: [theme],
          }),
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
          />
        ))}
      </div>
    </ThemeContext.Provider>
  );
}

const Root = forwardRef(RichText);
export { Root as RichText };
