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

export interface BodyProps extends ComponentPropsWithRef<'div'>, StyleProps {}

const bodyClassName = `${classNameRoot}__body` as const;

function ChecklistBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
  const { theme: injectedTheme, className, children, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.body(), theme],
        }),
        bodyClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </div>
  );
}

const Body = forwardRef(ChecklistBody);
export { Body, Body as ChecklistBody };
