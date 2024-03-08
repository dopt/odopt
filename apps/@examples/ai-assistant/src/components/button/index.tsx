import { PropsWithChildren } from 'react';
import { buttonClass, buttonTextClass } from './index.css';

interface Props extends PropsWithChildren {
  disabled?: boolean;
  onClick?: () => void;
}

export function Button({
  disabled = false,
  children,
  onClick = () => {
    /* */
  },
}: Props) {
  return (
    <button disabled={disabled} className={buttonClass} onClick={onClick}>
      <span className={buttonTextClass}>{children}</span>
    </button>
  );
}
