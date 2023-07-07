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
  ThemeContext,
  getThemeClassName,
} from '@dopt/react-theme';

export interface ChecklistProps
  extends ComponentPropsWithRef<'section'>,
    StyleProps {}
const checklistClassName = classNameRoot;

function Checklist(props: ChecklistProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme, className, ...restProps } = props;

  return (
    <ThemeContext.Provider value={theme}>
      <section
        className={cls([
          getThemeClassName({
            theme,
            className: [classes.root(), theme],
          }),
          checklistClassName,
          className,
        ])}
        {...restProps}
        ref={ref}
      />
    </ThemeContext.Provider>
  );
}

const Root = forwardRef(Checklist);
export { Root };
