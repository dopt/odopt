import { PropsWithChildren } from 'react';

import {
  modalClass,
  modalHeader,
  modalCloseIcon,
  modalTitle,
} from './index.css';

interface Props extends PropsWithChildren {
  open?: boolean;
}

export function Modal({ children, open = false }: Props) {
  return (
    <div className={modalClass({ open })}>
      <div className={modalHeader}>
        <div className={modalTitle}>Modal</div>
        <div className={modalCloseIcon}></div>
      </div>
      {children}
    </div>
  );
}
