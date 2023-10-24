import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

import RichText from '@dopt/react-rich-text';

import type { HintsItem } from '@dopt/semantic-data-layer-hints';

export interface BodyProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    StyleProps {
  children?: HintsItem['body'];
}

const bodyClassName = `${classNameRoot}__body` as const;

function HintsItemBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
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
          className: classes.hintsItemBody,
        }),
        bodyClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <RichText>{children}</RichText>
    </div>
  );
}

const Body = forwardRef(HintsItemBody);
export { Body };
