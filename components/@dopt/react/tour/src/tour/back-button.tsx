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

import type { TourItem } from '@dopt/semantic-data-layer-tour';

export interface BackButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: TourItem['backLabel'];
}

const backButtonClassName = `${classNameRoot}__back-button` as const;

function TourItemBackButton(
  props: BackButtonProps,
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
          className: classes.tourItemBackButton,
        }),
        backButtonClassName,
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

const BackButton = forwardRef(TourItemBackButton);
export { BackButton };
