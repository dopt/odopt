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

import type { ChecklistItem } from '@dopt/semantic-data-layer-checklist';

export interface ItemProps extends ComponentPropsWithRef<'li'>, StyleProps {}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItem(props: ItemProps, ref?: ForwardedRef<HTMLLIElement>) {
  const { css, theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <li
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.item({ css }), theme],
        }),
        itemClassName,
        /*
        `${itemClassName}--${(item.index || 0) + 1}`,
        item.active ? `${itemClassName}--active` : undefined,
        item.completed ? `${itemClassName}--completed` : undefined,
        item.skipped ? `${itemClassName}--skipped` : undefined,
         */
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}
const Item = forwardRef(ChecklistItem);
export { Item, Item as ChecklistItem };
