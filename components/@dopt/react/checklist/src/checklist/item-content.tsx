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

export interface ChecklistItemContentProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemContent(
  props: ChecklistItemContentProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemContent,
        }),
        `${itemClassName}-content`,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {props.children}
    </div>
  );
}

const ItemContent = forwardRef(ChecklistItemContent);
export { ItemContent };
