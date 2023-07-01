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

export interface BackButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: TourItem['backLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const backButtonClassName = `${classNameRoot}__back-button` as const;

function TourItemBackButton(
  props: BackButtonProps,
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
          className: [classes.backButton(), theme],
        }),
        backButtonClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const BackButton = forwardRef(TourItemBackButton);
export { BackButton };
