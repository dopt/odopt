import React, { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  children: ReactNode;
  container?: HTMLElement | null;
}

export function Portal(props: PortalProps) {
  const { children, container = globalThis?.document?.body } = props;
  return <>{container ? createPortal(children, container) : children}</>;
}
