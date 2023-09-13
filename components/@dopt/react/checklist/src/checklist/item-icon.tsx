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

export interface ItemIconProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemIcon(
  props: ItemIconProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemIcon,
        }),
        `${itemClassName}-icon`,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

const ItemIcon = forwardRef(ChecklistItemIcon);
export { ItemIcon };
