import { PropsWithChildren } from 'react';
import { buttonClass, buttonTextClass } from './index.css';

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

export function Button({
  children,
  onClick = () => {
    /* */
  },
}: Props) {
  return (
    <button className={buttonClass} onClick={onClick}>
      <span className={buttonTextClass}>{children}</span>
    </button>
  );
}
