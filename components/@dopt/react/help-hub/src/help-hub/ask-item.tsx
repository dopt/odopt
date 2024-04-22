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

export interface AskItemProps
  extends Omit<ComponentPropsWithRef<'li'>, 'children' | 'onClick'>,
    StyleProps {
  query: string;
  onClick: () => void;
}

const askItemClassName = `${classNameRoot}__ask-item` as const;

function AskIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
    </svg>
  );
}

function HelpHubAskItem(
  props: AskItemProps,
  ref?: ForwardedRef<HTMLLIElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    query,
    onClick,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <li
      className={clsx([
        themeClassName({
          theme,
          className: classes.helpHubAskItem,
        }),
        askItemClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      onClick={onClick}
      ref={ref}
    >
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubAskItemIcon,
          }),
          `${askItemClassName}-icon`,
        ])}
      >
        <AskIcon />
      </div>
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.helpHubAskItemContent,
          }),
          `${askItemClassName}-content`,
        ])}
      >
        Ask AI: {query}
      </div>
    </li>
  );
}

const AskItem = forwardRef(HelpHubAskItem);
export { AskItem };
