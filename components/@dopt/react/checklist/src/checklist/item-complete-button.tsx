import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
  MouseEventHandler,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';
import { ChecklistItem } from '@dopt/semantic-data-layer-checklist';

export interface ChecklistItemCompleteButtonProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {
  children?: ChecklistItem['completeLabel'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemCompleteButton(
  props: ChecklistItemCompleteButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const {
    theme: injectedTheme,
    className,
    onClick,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  if (!children) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemCompleteButton(),
        }),
        `${itemClassName}-complete-button`,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </button>
  );
}

const ItemCompleteButton = forwardRef(ChecklistItemCompleteButton);
export { ItemCompleteButton };
