import * as classes from '../styles';
import { classNameRoot } from '../const';

import {
  type ForwardedRef,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react';

import {
  cls,
  type StyleProps,
  getThemeClassName,
  useTheme,
} from '@dopt/react-theme';

export interface ContentProps
  extends ComponentPropsWithRef<'section'>,
    StyleProps {}

const contentClassName = `${classNameRoot}__content` as const;

function TourItemContent(props: ContentProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <section
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.content(), theme],
        }),
        contentClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

const Content = forwardRef(TourItemContent);
export { Content, Content as TourItemContent };
