import { Avatar } from '@/components';

import { user } from './index.css';

export function User() {
  return (
    <div className={user}>
      <Avatar />
      Wilson Dokidis
    </div>
  );
}
