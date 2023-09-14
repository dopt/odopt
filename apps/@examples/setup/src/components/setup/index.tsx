import { Invite } from './invite';
import { Role } from './role';
import { Settings } from './settings';
import { UseCase } from './use-case';

import './styles.css';

export function Setup() {
  return (
    <>
      <Role />
      <UseCase />
      <Settings />
      <Invite />
    </>
  );
}
