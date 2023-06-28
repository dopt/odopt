import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

export interface ChecklistItemIconProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {}

const itemIconClassName = `${classNameRoot}__item-icon` as const;

function ChecklistItemIcon(
  props: ChecklistItemIconProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { css, theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemIcon({
            /*
            completed: item.completed,
            skipped: item.skipped,
             */
          }),
        }),
        `${itemIconClassName}-icon`,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

const ItemIcon = forwardRef(ChecklistItemIcon);
export { ItemIcon, ItemIcon as ChecklistItemIcon };
