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
import { Checklist } from '@dopt/semantic-data-layer-checklist';
import { RichText } from '@dopt/react-rich-text';

export interface BodyProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'>,
    StyleProps {
  children?: Checklist['body'];
}

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
      <RichText>{children}</RichText>
    </div>
  );
}

const Body = forwardRef(ChecklistBody);
export { Body, Body as ChecklistBody };
