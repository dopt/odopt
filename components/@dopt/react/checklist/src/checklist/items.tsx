import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface ItemsProps extends ComponentPropsWithRef<'ul'>, StyleProps {}

const itemsClassName = `${classNameRoot}__items` as const;

function ChecklistItems(
  props: ItemsProps,
  ref?: ForwardedRef<HTMLUListElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <ul
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItems,
        }),
        itemsClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

const Items = forwardRef(ChecklistItems);
export { Items };
