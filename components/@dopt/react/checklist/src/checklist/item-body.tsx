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

export interface ChecklistItemBodyProps
  extends Omit<ComponentPropsWithRef<'div'>, 'title'>,
    StyleProps {
  children: ChecklistItem['body'];
  disabled?: boolean;
}

const itemClassName = `${classNameRoot}__item` as const;

function ChecklistItemBody(
  props: ChecklistItemBodyProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const {
    theme: injectedTheme,
    className,
    disabled = false,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  if (!children) {
    return null;
  }

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemBody({
            disabled,
          }),
        }),
        `${itemClassName}-body`,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </div>
  );
}

const ItemBody = forwardRef(ChecklistItemBody);
export { ItemBody, ItemBody as ChecklistItemBody };
