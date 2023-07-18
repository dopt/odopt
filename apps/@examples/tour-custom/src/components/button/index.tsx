import { type ComponentPropsWithoutRef } from 'react';
import './styles.css';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', ...restProps } = props;
  return <button {...restProps} className={`button button--${variant}`} />;
}
