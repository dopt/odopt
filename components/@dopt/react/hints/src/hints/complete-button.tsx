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

export interface CompleteButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: HintsItem['completeLabel'];
}

const completeButtonClassName = `${classNameRoot}__complete-button` as const;

function HintsItemCompleteButton(
  props: CompleteButtonProps,
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
          className: classes.hintsItemCompleteButton,
        }),
        completeButtonClassName,
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

const CompleteButton = forwardRef(HintsItemCompleteButton);
export { CompleteButton };
