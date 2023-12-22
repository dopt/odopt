import { IconApiApp } from '@tabler/icons';
import { brand } from './index.css';

export function Brand() {
  return (
    <div className={brand}>
      <IconApiApp />
      <div>SomeCRM</div>
    </div>
  );
}
