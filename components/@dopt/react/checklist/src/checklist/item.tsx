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

export interface ItemProps extends ComponentPropsWithRef<'li'>, StyleProps {
  index?: number;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItem(props: ItemProps, ref?: ForwardedRef<HTMLLIElement>) {
  const { theme: injectedTheme, className, index, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <li
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.item(), theme],
        }),
        itemClassName,
        index !== undefined ? `${itemClassName}--${index + 1}` : undefined,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}
const Item = forwardRef(ChecklistItem);
export { Item };
