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

import type { Tour, TourItem } from '@dopt/semantic-data-layer-tour';

export interface ProgressProps extends ComponentPropsWithRef<'ol'>, StyleProps {
  count: Tour['size'];
  index: TourItem['index'];
}

const progressClassName = `${classNameRoot}__progress` as const;

function TourProgress(
  props: ProgressProps,
  ref?: ForwardedRef<HTMLOListElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    index,
    count,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <ol
      className={clsx([
        themeClassName({ theme, className: classes.tourItemProgress }),
        progressClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {Array(count)
        .fill(null)
        .map((_, i) => (
          <li
            key={i}
            className={clsx([
              themeClassName({
                theme,
                className: classes.tourItemProgressItem({
                  active: i === index,
                }),
              }),
              `${progressClassName}-item`,
              i === index ? `${progressClassName}-item--active` : null,
            ])}
          />
        ))}
    </ol>
  );
}

const Progress = forwardRef(TourProgress);
export { Progress };
