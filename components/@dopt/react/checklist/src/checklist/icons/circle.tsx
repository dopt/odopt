import * as classes from '../../styles';
import { classNameRoot } from '../../const';

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

export interface ChecklistIconCircleProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {}

const itemIconClassName = `${classNameRoot}__item-icon` as const;

function ChecklistIconCircle(
  props: ChecklistIconCircleProps,
  ref?: ForwardedRef<HTMLDivElement>
) {
  const { theme: injectedTheme, className, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  return (
    <div
      className={cls([
        getThemeClassName({
          theme,
          className: classes.itemIconCircle(),
        }),
        `${itemIconClassName}-circle`,
      ])}
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
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      </svg>
    </div>
  );
}

const IconCircle = forwardRef(ChecklistIconCircle);
export { IconCircle, IconCircle as ChecklistIconCircle };
