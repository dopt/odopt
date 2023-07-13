import { type ComponentPropsWithoutRef } from 'react';
import './styles.css';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button(props: ButtonProps) {
  return <button {...props} className="button" />;
}
