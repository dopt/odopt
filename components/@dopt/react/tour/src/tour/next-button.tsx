import * as classes from './styles.css';
import { classNameRoot } from '../const';

import {
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

export interface NextButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: TourItem['nextLabel'];
}

const nextButtonClassName = `${classNameRoot}__next-button` as const;

function TourItemNextButton(
  props: NextButtonProps,
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
          className: classes.tourItemNextButton,
        }),
        nextButtonClassName,
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

const NextButton = forwardRef(TourItemNextButton);
export { NextButton };
