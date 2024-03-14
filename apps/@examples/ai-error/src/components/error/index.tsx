import './styles.css';
import { useState } from 'react';
import { Panel, PanelProps } from './panel';

interface ErrorProps {
  children: PanelProps['error'];
  for: PanelProps['element'];
  onFix?: PanelProps['onFix'];
}

export function Error(props: ErrorProps) {
  const { children, for: element, onFix } = props;

  const [active, setActive] = useState(false);

  return (
    <>
      <div className="error">
        {children}
        <button className="error-btn" onClick={() => setActive(true)}>
          Explain whatʼs wrong &rarr;
        </button>
      </div>
      {active && (
        <Panel
          error={children}
          element={element}
          onClose={() => setActive(false)}
          onFix={onFix}
        />
      )}
    </>
  );
}
