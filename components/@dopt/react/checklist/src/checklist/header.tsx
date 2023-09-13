import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
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

function ChecklistHeader(props: HeaderProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <header
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistHeader,
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

const Header = forwardRef(ChecklistHeader);
export { Header };
