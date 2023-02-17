import { PropsWithChildren } from 'react';

import { textClass } from './index.css';
interface Props extends PropsWithChildren {
  strikeThrough: boolean;
}

export function Text({ children, strikeThrough }: Props) {
  return <span className={textClass({ strikeThrough })}>{children}</span>;
}
