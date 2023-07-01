import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  type ForwardedRef,
  forwardRef,
  type MouseEventHandler,
  type ComponentPropsWithRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

import type { TourItem } from '@dopt/semantic-data-layer-tour';

export interface NextButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: TourItem['nextLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const nextButtonClassName = `${classNameRoot}__next-button` as const;

function TourItemNextButton(
  props: NextButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    children,
    onClick,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <button
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.nextButton(), theme],
        }),
        nextButtonClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const NextButton = forwardRef(TourItemNextButton);
export { NextButton };
