import { classNameRoot } from '../../const';

import React, {
  forwardRef,
  type ForwardedRef,
  type ComponentPropsWithRef,
} from 'react';
import clsx from 'clsx';

export type IconActiveProps = ComponentPropsWithRef<'svg'>;

const itemIconClassName = `${classNameRoot}__icon` as const;

function ChecklistIconActive(
  props: IconActiveProps,
  ref?: ForwardedRef<SVGSVGElement>
) {
  const { className, ...restProps } = props;

  return (
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
      className={clsx([
        itemIconClassName,
        `${itemIconClassName}-active`,
        className,
      ])}
      ref={ref}
      {...restProps}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    </svg>
  );
}

const IconActive = forwardRef(ChecklistIconActive);
export { IconActive };
