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

export interface LoaderProps extends ComponentPropsWithRef<'div'>, StyleProps {}

const loaderClassName = `${classNameRoot}__loader` as const;
const skeletonClassName = `${loaderClassName}-skeleton` as const;

function HelpHubLoader(props: LoaderProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubLoader,
        }),
        loaderClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubSkeleton,
          }),
          skeletonClassName,
        ])}
        style={{ width: '100%' }}
      />
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubSkeleton,
          }),
          skeletonClassName,
        ])}
        style={{ width: '85%' }}
      />
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubSkeleton,
          }),
          skeletonClassName,
        ])}
        style={{ width: '95%' }}
      />
    </div>
  );
}

const Loader = forwardRef(HelpHubLoader);
export { Loader };
