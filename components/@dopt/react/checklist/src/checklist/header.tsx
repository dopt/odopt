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

export interface ChecklistHeaderProps
  extends ComponentPropsWithRef<'header'>,
    StyleProps {}

const headerClassName = `${classNameRoot}__header` as const;

function ChecklistHeader(
  props: ChecklistHeaderProps,
  ref?: ForwardedRef<HTMLElement>
) {
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

const Header = forwardRef(ChecklistHeader);
export { Header };
