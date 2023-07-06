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

export interface ItemsProps extends ComponentPropsWithRef<'ul'>, StyleProps {}

const itemsClassName = `${classNameRoot}__items` as const;

function ChecklistItems(
  props: ItemsProps,
  ref?: ForwardedRef<HTMLUListElement>
) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <ul
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.items(), theme],
        }),
        itemsClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

const Items = forwardRef(ChecklistItems);
export { Items };
