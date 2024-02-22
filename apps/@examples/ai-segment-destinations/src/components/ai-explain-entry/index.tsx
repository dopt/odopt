import { flex, shortcutTag } from './index.css';

export function isMac(): boolean {
  const userAgent = window.navigator.userAgent;
  return userAgent.indexOf('Mac') !== -1;
}

import { useContextualAssistant } from '@dopt/react-contextual-assistant';

export function AIExplainEntry() {
  const { setActive } = useContextualAssistant();

  return (
    <div onClick={() => setActive((prev) => !prev)}>
      <div className={flex}>
        <span>Explain with AI</span>
        <div className={shortcutTag}>{`${isMac() ? '⌘' : '^'}E`}</div>
      </div>
    </div>
  );
}
