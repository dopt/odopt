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

export interface ItemCompleteButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: ChecklistItem['completeLabel'];
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemCompleteButton(
  props: ItemCompleteButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className: _,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  if (!children) {
    return null;
  }

  return (
    <button
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemCompleteButton,
        }),
        `${itemClassName}-complete-button`,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const ItemCompleteButton = forwardRef(ChecklistItemCompleteButton);
export { ItemCompleteButton };
