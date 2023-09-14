import { type ComponentProps } from 'react';

import './styles.css';

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type'> {
  label: string;
}

export function Checkbox(props: CheckboxProps) {
  const { label, ...restProps } = props;

  return (
    <label className="checkbox">
      <input type="checkbox" className="checkbox-input" {...restProps} />
      {label}
    </label>
  );
}
