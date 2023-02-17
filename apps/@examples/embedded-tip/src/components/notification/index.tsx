import { PropsWithChildren } from 'react';

import {
  notificationClass,
  notificationHeader,
  notificationCloseIcon,
  notificationTitle,
} from './index.css';

interface Props extends PropsWithChildren {
  title: string | null;
  open?: boolean;
}

export function Notification({ children, title, open = false }: Props) {
  return (
    <div className={notificationClass({ open })}>
      <div className={notificationHeader}>
        <div className={notificationTitle}>{title}</div>
        <div className={notificationCloseIcon}></div>
      </div>
      {children}
    </div>
  );
}
