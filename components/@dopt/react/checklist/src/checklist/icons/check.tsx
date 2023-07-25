import * as classes from '../styles.css';
import { classNameRoot } from '../../const';

import {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

export interface ChecklistIconCheckProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {}

const itemIconClassName = `${classNameRoot}__item-icon` as const;

function ChecklistIconCheck(
  props: ChecklistIconCheckProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { theme: injectedTheme, className, style, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={clsx([
        themeClassName({
          theme,
          className: classes.checklistItemIconChecked,
        }),
        itemIconClassName,
        `${itemIconClassName}-checked`,
      ])}
      style={themeStyle({ theme, style })}
      {...restProps}
      ref={ref}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
          strokeWidth="0"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}

const IconCheck = forwardRef(ChecklistIconCheck);
export { IconCheck };
