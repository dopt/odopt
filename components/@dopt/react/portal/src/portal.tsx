import * as React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement | null;
}

function Portal(props: PortalProps) {
  const { children, container = globalThis?.document?.body } = props;
  return (
    <>{container ? ReactDOM.createPortal(children, container) : children}</>
  );
}

export { Portal as Root };
export type { PortalProps };
