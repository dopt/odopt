import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  PropsWithChildren,
} from 'react';

import clsx from 'clsx';

import * as classes from './styles.css';
import { classNameRoot } from '../const';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface LauncherProps
  extends PropsWithChildren,
    ComponentPropsWithRef<'div'>,
    StyleProps {
  isOpen: boolean;
}

const footerClassName = `${classNameRoot}__launcher` as const;

function HelpHubLauncher(
  props: LauncherProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    isOpen,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubLauncher,
        }),
        footerClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <svg
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubLauncherIcon({ open: isOpen }),
          }),
        ])}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 16v.01" />
        <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
      </svg>
    </div>
  );
}

const Launcher = forwardRef(HelpHubLauncher);
export { Launcher };
