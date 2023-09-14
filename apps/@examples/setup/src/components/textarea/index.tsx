import { type ComponentProps } from 'react';

import './styles.css';

type TextareaProps = ComponentProps<'textarea'>;

export function Textarea(props: TextareaProps) {
  return <textarea className="textarea" {...props} />;
}
