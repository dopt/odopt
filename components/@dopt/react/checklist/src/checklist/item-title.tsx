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
import { ChecklistItem } from '@dopt/semantic-data-layer-checklist';

export interface ChecklistItemTitleProps
  extends Omit<ComponentPropsWithRef<'div'>, 'title'>,
    StyleProps {
  children: ChecklistItem['title'];
  disabled?: boolean;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemTitle(
  props: ChecklistItemTitleProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    disabled = false,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  if (!props.children) {
    return null;
  }

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemTitle({
            disabled,
          }),
        }),
        `${itemClassName}-title`,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

const ItemTitle = forwardRef(ChecklistItemTitle);
export { ItemTitle, ItemTitle as ChecklistItemTitle };
