import { type ComponentProps } from 'react';

import './styles.css';

interface RadioProps extends Omit<ComponentProps<'input'>, 'type'> {
  label: string;
}

export function Radio(props: RadioProps) {
  const { label, ...restProps } = props;

  return (
    <label className="radio">
      <input type="radio" className="radio-input" {...restProps} />
      {label}
    </label>
  );
}
