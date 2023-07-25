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

import RichText from '@dopt/react-rich-text';

export interface ChecklistItemBodyProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
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
    style,
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
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemBody({
            disabled,
          }),
        }),
        `${itemClassName}-body`,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <RichText>{children}</RichText>
    </div>
  );
}

const ItemBody = forwardRef(ChecklistItemBody);
export { ItemBody };
