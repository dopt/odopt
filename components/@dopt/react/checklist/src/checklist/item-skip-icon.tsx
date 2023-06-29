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
import { IconX } from './icons';

export interface ChecklistItemSkipIconProps
  extends Omit<ComponentPropsWithRef<'button'>, 'title'>,
    StyleProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemSkipIcon(
  props: ChecklistItemSkipIconProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { theme: injectedTheme, className, onClick, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <button
      onClick={onClick}
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemSkipIcon(),
        }),
        `${itemClassName}-skip-icon`,
      ])}
      {...restProps}
      ref={ref}
    >
      <IconX />
    </button>
  );
}

const ItemSkipIcon = forwardRef(ChecklistItemSkipIcon);
export { ItemSkipIcon, ItemSkipIcon as ChecklistItemSkipIcon };
