import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import { type StyleProps, themeClassName, themeStyle } from '@dopt/react-theme';

export interface TitleProps extends ComponentPropsWithRef<'h1'>, StyleProps {}

const titleClassName = `${classNameRoot}__title` as const;

function HelpHubTitle(
  props: TitleProps,
  ref?: ForwardedRef<HTMLHeadingElement>
) {
  const { theme, className, style, children, ...restProps } = props;

  return children == undefined ? null : (
    <h1
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubTitle,
        }),
        titleClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </h1>
  );
}

const Title = forwardRef(HelpHubTitle);
export { Title };
