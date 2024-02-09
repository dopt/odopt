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

export interface SourcesProps
  extends Omit<ComponentPropsWithRef<'ul'>, 'children'>,
    StyleProps {
  children?: ReactNode;
}

const sourcesClassName = `${classNameRoot}__sources` as const;

function ContextualAssistantSources(
  props: SourcesProps,
  ref?: ForwardedRef<HTMLUListElement>
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
    <ul
      className={clsx([
        themeClassName({
          theme,
          className: classes.contextualAssistantSources,
        }),
        sourcesClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      {children}
    </ul>
  );
}

const Sources = forwardRef(ContextualAssistantSources);
export { Sources };
