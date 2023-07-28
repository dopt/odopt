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
    className: _,
    style,
    disabled = false,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  if (!props.children) {
    return null;
  }

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemTitle({
            disabled,
          }),
        }),
        `${itemClassName}-title`,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

const ItemTitle = forwardRef(ChecklistItemTitle);
export { ItemTitle };
