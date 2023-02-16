import { PropsWithChildren } from 'react';
import { buttonClass, buttonTextClass } from './index.css';

interface Props extends PropsWithChildren {
  color: 'pink';
  onClick: () => void;
}

export function Button({ children, color, onClick }: Props) {
  return (
    <button className={buttonClass({ color })} onClick={onClick}>
      <span className={buttonTextClass}>{children}</span>
    </button>
  );
}
