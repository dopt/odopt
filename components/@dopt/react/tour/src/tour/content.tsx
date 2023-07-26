import * as classes from './styles.css';
import { classNameRoot } from '../const';

import {
  type ForwardedRef,
  type ComponentPropsWithRef,
  forwardRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface ContentProps
  extends ComponentPropsWithRef<'section'>,
    StyleProps {}

const contentClassName = `${classNameRoot}__content` as const;

function TourItemContent(props: ContentProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <section
      className={clsx([
        themeClassName({
          theme,
          className: classes.tourItemContent,
        }),
        contentClassName,
        className,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    />
  );
}

const Content = forwardRef(TourItemContent);
export { Content };
