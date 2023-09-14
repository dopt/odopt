import { useState } from 'react';
import { Avatar } from './avatar';

import './styles.css';

const avatars = ['🤡', '👽', '🤖', '🐶', '🐱', '🦊', '🐻‍❄️', '🐸', '🐵', '🐰'];

export function Avatars() {
  const [selection, setSelection] = useState(0);

  return (
    <ul className="avatars">
      {avatars.map((avatar, i) => (
        <li key={i}>
          <Avatar active={selection == i} onClick={() => setSelection(i)}>
            {avatar}
          </Avatar>
        </li>
      ))}
    </ul>
  );
}
