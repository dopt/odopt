import * as classes from './styles.css';
import { classNameRoot } from '../const';

import {
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

import type { ChecklistItem } from '@dopt/semantic-data-layer-checklist';

export interface ItemProps extends ComponentPropsWithRef<'li'>, StyleProps {
  index?: number;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItem(props: ItemProps, ref?: ForwardedRef<HTMLLIElement>) {
  const { theme: injectedTheme, className, style, index, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <li
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItem,
        }),
        itemClassName,
        index !== undefined ? `${itemClassName}--${index + 1}` : undefined,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}
const Item = forwardRef(ChecklistItem);
export { Item };
