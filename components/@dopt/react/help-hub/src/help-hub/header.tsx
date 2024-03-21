import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface HeaderProps
  extends ComponentPropsWithRef<'header'>,
    StyleProps {}

const headerClassName = `${classNameRoot}__header` as const;

function HelpHubHeader(props: HeaderProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <header
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubHeader,
        }),
        headerClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

const Header = forwardRef(HelpHubHeader);
export { Header };
