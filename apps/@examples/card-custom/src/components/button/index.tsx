import { type ComponentPropsWithoutRef } from 'react';
import './styles.css';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'minimal';
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', ...restProps } = props;

  return <button {...restProps} className={`button button--${variant}`} />;
}
