import { useFlow } from '@dopt/react';

import { DOPT_FLOW_ID } from '../../const';

import './styles.css';

export function Header() {
  const [, intent] = useFlow(DOPT_FLOW_ID);

  return (
    <header className="header">
      <button className="header__button" onClick={intent.reset}>
        Reset flow
      </button>
    </header>
  );
}
