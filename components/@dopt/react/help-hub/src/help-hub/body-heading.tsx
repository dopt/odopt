import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface BodyHeadingProps
  extends Omit<ComponentPropsWithRef<'h2'>, 'children'>,
    StyleProps {
  children?: ReactNode;
}

const BodyHeadingClassName = `${classNameRoot}__body-heading` as const;

function HelpHubBodyHeading(
  props: BodyHeadingProps,
  ref?: ForwardedRef<HTMLHeadingElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <h2
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubBodyHeading,
        }),
        BodyHeadingClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </h2>
  );
}

const BodyHeading = forwardRef(HelpHubBodyHeading);
export { BodyHeading };
