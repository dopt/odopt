import { type ComponentPropsWithoutRef } from 'react';
import { type Modal } from '@dopt/react-modal';
import './styles.css';

export interface ModalProps
  extends Omit<ComponentPropsWithoutRef<'dialog'>, 'title'> {
  title?: Modal['title'];
}

export function Modal(props: ModalProps) {
  const { children, title, ...restProps } = props;
  return (
    <dialog className="modal" {...restProps}>
      <section className="modal__content">
        {title && (
          <header>
            <h1 className="modal__title">{title}</h1>
          </header>
        )}
        {children}
      </section>
    </dialog>
  );
}
