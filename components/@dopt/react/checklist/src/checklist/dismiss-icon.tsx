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

export interface DismissIconProps
  extends ComponentPropsWithRef<'button'>,
    StyleProps {}

const dismissIconClassName = `${classNameRoot}__dismiss-icon` as const;

function ChecklistDismissIcon(
  props: DismissIconProps,
  ref?: ForwardedRef<HTMLButtonElement>
) {
  const { theme: injectedTheme, className, onClick, ...restProps } = props;

  const theme = useTheme(injectedTheme);

  const icon = (
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
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  );

  return (
    <button
      className={cls([
        getThemeClassName({
          theme,
          className: [classes.dismissIcon(), theme],
        }),
        dismissIconClassName,
        className,
      ])}
      onClick={onClick}
      {...restProps}
      ref={ref}
    >
      {icon}
    </button>
  );
}

const DismissIcon = forwardRef(ChecklistDismissIcon);
export { DismissIcon, DismissIcon as ChecklistDismissIcon };
