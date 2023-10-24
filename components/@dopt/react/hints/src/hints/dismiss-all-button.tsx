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

import type { HintsItem } from '@dopt/semantic-data-layer-hints';

export interface DismissAllButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: HintsItem['dismissAllLabel'];
}

const dismissAllButtonClassName =
  `${classNameRoot}__dismiss-all-button` as const;

function HintsItemDismissAllButton(
  props: DismissAllButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
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
    <button
      className={clsx([
        themeClassName({
          theme,
          className: classes.hintsItemDismissAllButton,
        }),
        dismissAllButtonClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const DismissAllButton = forwardRef(HintsItemDismissAllButton);
export { DismissAllButton };
