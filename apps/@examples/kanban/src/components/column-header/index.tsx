import {
  IconCircleCheck,
  IconCircleDotted,
  IconCircleHalf2,
} from '@tabler/icons';
import { containerClass, titleClass } from './index.css';

interface Props {
  id: string;
  children: string;
}

function iconForId(id: string) {
  switch (id) {
    case 'backlog':
      return <IconCircleDotted width={18} height={18} />;
    case 'inProgress':
      return <IconCircleHalf2 width={18} height={18} />;
    case 'done':
      return <IconCircleCheck width={18} height={18} />;
  }
}

export function ColumnHeader({ children, id }: Props) {
  return (
    <div className={containerClass}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {iconForId(id)}
        <h2 className={titleClass}>{children}</h2>
      </div>
    </div>
  );
}
