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

export interface ChecklistItemContentProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemContent(
  props: ChecklistItemContentProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemContent(),
        }),
        `${itemClassName}-content`,
      ])}
      {...restProps}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

const ItemContent = forwardRef(ChecklistItemContent);
export { ItemContent, ItemContent as ChecklistItemContent };
