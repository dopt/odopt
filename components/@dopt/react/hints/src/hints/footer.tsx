import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface FooterProps
  extends Omit<ComponentPropsWithRef<'footer'>, 'title'>,
    StyleProps {}

const footerClassName = `${classNameRoot}__footer` as const;

function HintsItemFooter(props: FooterProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <footer
      className={clsx([
        themeClassName({
          theme,
          className: classes.hintsItemFooter,
        }),
        footerClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

const Footer = forwardRef(HintsItemFooter);
export { Footer };
