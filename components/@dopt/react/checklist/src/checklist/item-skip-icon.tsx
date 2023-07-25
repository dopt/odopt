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
import { IconX } from './icons';

export interface ChecklistItemSkipIconProps
  extends Omit<ComponentPropsWithRef<'button'>, 'title'>,
    StyleProps {}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemSkipIcon(
  props: ChecklistItemSkipIconProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <button
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemSkipIcon,
        }),
        `${itemClassName}-skip-icon`,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <IconX />
    </button>
  );
}

const ItemSkipIcon = forwardRef(ChecklistItemSkipIcon);
export { ItemSkipIcon };
