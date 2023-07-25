import { type ReactNode } from 'react';
import { ChecklistProgress } from './progress';
import RichText from '@dopt/react-rich-text';

import './styles.css';

export interface ChecklistProps {
  title?: string | null;
  body?: any;
  value: number;
  max: number;
  children?: ReactNode;
}

export function Checklist(props: ChecklistProps) {
  const { title, body, value, max, children } = props;
  return (
    <section className="checklist">
      <header className="checklist__header">
        <div className="checklist__content">
          <h1 className="checklist__title">{title}</h1>
          <div className="checklist__body">
            <RichText>{body}</RichText>
          </div>
        </div>
        <ChecklistProgress value={value} max={max} />
      </header>
      <ul className="checklist__items">{children}</ul>
    </section>
  );
}
