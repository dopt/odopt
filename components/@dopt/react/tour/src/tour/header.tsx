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

export interface HeaderProps
  extends ComponentPropsWithRef<'header'>,
    StyleProps {}

const headerClassName = `${classNameRoot}__header` as const;

function TourItemHeader(props: HeaderProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <header
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.header(), theme],
        }),
        headerClassName,
        className,
      ])}
      {...restProps}
      ref={ref}
    />
  );
}

const Header = forwardRef(TourItemHeader);
export { Header, Header as TourItemHeader };
