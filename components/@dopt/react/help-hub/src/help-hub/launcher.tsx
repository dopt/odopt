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

import { Activator } from './activator';

export interface LauncherProps
  extends PropsWithChildren,
    ComponentPropsWithRef<'div'>,
    StyleProps {}

const HelpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M12 16v.01" />
    <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
  </svg>
);

const footerClassName = `${classNameRoot}__launcher` as const;

function HelpHubLauncher(
  props: LauncherProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <Activator>
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
        <HelpIcon />
      </div>
    </Activator>
  );
}

const Launcher = forwardRef(HelpHubLauncher);
export { Launcher };
