import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  type ForwardedRef,
  forwardRef,
  type ComponentPropsWithRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

import { RichText } from '@dopt/react-rich-text';

import type { TourItem } from '@dopt/semantic-data-layer-tour';

export interface BodyProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    StyleProps {
  children?: TourItem['body'];
}

const bodyClassName = `${classNameRoot}__body` as const;

function TourItemBody(props: BodyProps, ref?: ForwardedRef<HTMLDivElement>) {
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
      <RichText>{children}</RichText>
    </div>
  );
}

const Body = forwardRef(TourItemBody);
export { Body };
