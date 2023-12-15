import { Avatar } from '@/components';

import { user } from './index.css';

export function User() {
  return (
    <div className={user}>
      <Avatar />
      Marley Workman
    </div>
  );
}
