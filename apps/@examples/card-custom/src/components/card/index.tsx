import { type ComponentPropsWithoutRef } from 'react';
import './styles.css';

export interface CardProps
  extends Omit<ComponentPropsWithoutRef<'dialog'>, 'title'> {
  title?: string | null;
}

export function Card(props: CardProps) {
  const { children, title, ...restProps } = props;
  return (
    <section className="card" {...restProps}>
      {title && (
        <header>
          <h1 className="card__title">{title}</h1>
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}
