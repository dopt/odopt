import { PropsWithChildren } from 'react';

import { notificationClass } from './index.css';

interface Props extends PropsWithChildren {
  open?: boolean;
}

export function Notification({ children, open = false }: Props) {
  return <div className={notificationClass({ open })}>{children}</div>;
}
