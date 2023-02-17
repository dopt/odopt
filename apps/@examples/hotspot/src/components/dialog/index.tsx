import { PropsWithChildren } from 'react';

import { dialogClass, dialogHeader, dialogTitle } from './index.css';

interface Props extends PropsWithChildren {
  title: string | null;
  open?: boolean;
}

export function Dialog({ children, title }: Props) {
  return (
    <div className={dialogClass}>
      <div className={dialogHeader}>
        <div className={dialogTitle}>{title}</div>
      </div>
      {children}
    </div>
  );
}
