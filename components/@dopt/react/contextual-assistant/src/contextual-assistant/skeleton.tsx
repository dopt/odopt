import * as classes from './styles.css';
import { classNameRoot } from './const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  CSSProperties,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface SkeletonProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

const bodyClassName = `${classNameRoot}__skeleton` as const;

function ContextualAssistantSkeleton(
  props: SkeletonProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    width,
    height,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.contextualAssistantSkeleton,
        }),
        bodyClassName,
        className,
      ])}
      style={{ width, height, ...themeStyle({ theme, style }) }}
      {...restProps}
      ref={ref}
    />
  );
}

const Skeleton = forwardRef(ContextualAssistantSkeleton);
export { Skeleton };
