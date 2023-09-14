import { type ComponentProps } from 'react';

import './styles.css';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'default' | 'minimal';
}

export function Button(props: ButtonProps) {
  const { variant = 'default', ...restProps } = props;
  return <button className={`button button--${variant}`} {...restProps} />;
}
