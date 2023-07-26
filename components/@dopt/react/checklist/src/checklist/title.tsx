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

export interface TitleProps extends ComponentPropsWithRef<'h1'>, StyleProps {}

const titleClassName = `${classNameRoot}__title` as const;

function ChecklistTitle(
  props: TitleProps,
  ref?: ForwardedRef<HTMLHeadingElement>
) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <h1
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistTitle,
        }),
        titleClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </h1>
  );
}

const Title = forwardRef(ChecklistTitle);
export { Title };
