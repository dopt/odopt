import { IconCheck } from '@tabler/icons';

import { radioClass } from './index.css';
interface Props {
  checked: boolean;
}

export function Radio({ checked = false }: Props) {
  return (
    <div className={radioClass({ checked })}>
      {checked && <IconCheck strokeWidth={4} size={20} color="white" />}
    </div>
  );
}
