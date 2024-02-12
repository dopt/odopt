import * as classes from './styles.css';
import { classNameRoot } from './const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface BodyProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    StyleProps {
  children?: ReactNode;
}

const bodyClassName = `${classNameRoot}__body` as const;

function ContextualAssistantBody(
  props: BodyProps,
  ref?: ForwardedRef<HTMLDivElement>
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
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.contextualAssistantBody,
        }),
        bodyClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </div>
  );
}

const Body = forwardRef(ContextualAssistantBody);
export { Body };
