import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  useContext,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

import { HintsItemContext } from './root';

export interface IndicatorProps
  extends ComponentPropsWithRef<'span'>,
    StyleProps {
  animate?: boolean;
}

const indicatorClassName = `${classNameRoot}__indicator` as const;

function HintsItemIndicator(
  props: IndicatorProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    animate = true,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  const { active } = useContext(HintsItemContext);

  if (!active) return null;

  return (
    <span
      className={clsx([
        themeClassName({
          theme,
          className: classes.hintsItemIndicator({ animate }),
        }),
        indicatorClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

const Indicator = forwardRef(HintsItemIndicator);
export { Indicator };
