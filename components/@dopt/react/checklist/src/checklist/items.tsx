import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
  ReactElement,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

import { ChecklistItem, ItemProps } from './item';

import type { Checklist } from '@dopt/semantic-data-layer-checklist';

export interface ItemsProps extends ComponentPropsWithRef<'ul'>, StyleProps {
  items?: Checklist['items'];
  children?: ReactElement<ItemProps>[];
}

const itemsClassName = `${classNameRoot}__items` as const;

function ChecklistItems(
  props: ItemsProps,
  ref?: ForwardedRef<HTMLUListElement>
) {
  const { css, theme: injectedTheme, className, items, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <ul
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.items({ css }), theme],
        }),
        itemsClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {items
        ? items.map((item) => (
            <ChecklistItem key={item.id} item={item} theme={theme} />
          ))
        : restProps.children || null}
    </ul>
  );
}

const Items = forwardRef(ChecklistItems);
export { Items, Items as ChecklistItems };
