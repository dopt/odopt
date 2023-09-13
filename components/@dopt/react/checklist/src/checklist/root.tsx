import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  ThemeContext,
  themeClassName,
  themeStyle,
} from '@dopt/react-theme';

export interface ChecklistProps
  extends ComponentPropsWithRef<'section'>,
    StyleProps {}
const checklistClassName = classNameRoot;

function Checklist(props: ChecklistProps, ref?: ForwardedRef<HTMLElement>) {
  const { theme, className, style, ...restProps } = props;

  return (
    <ThemeContext.Provider value={theme}>
      <section
        className={clsx([
          themeClassName({
            theme,
            className: classes.checklistRoot,
          }),
          checklistClassName,
          className,
        ])}
        style={themeStyle({ theme, style })}
        {...restProps}
        ref={ref}
      />
    </ThemeContext.Provider>
  );
}

const Root = forwardRef(Checklist);
export { Root };
