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

export interface TitleProps extends ComponentPropsWithRef<'h1'>, StyleProps {}

const titleClassName = `${classNameRoot}__title` as const;

function TourItemTitle(
  props: TitleProps,
  ref?: ForwardedRef<HTMLHeadingElement>
) {
  const { theme: injectedTheme, className, children, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return children == undefined ? null : (
    <h1
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.title(), theme],
        }),
        titleClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    >
      {children}
    </h1>
  );
}
const Title = forwardRef(TourItemTitle);

export { Title };
