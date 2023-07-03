import * as React from 'react';
import ReactDOM from 'react-dom';

import { ComponentPropsWithRef } from '@dopt/react-component';

interface PortalProps extends ComponentPropsWithRef<'div'> {
  container?: HTMLElement | null;
}

function Portal(props: PortalProps, ref?: React.ForwardedRef<HTMLDivElement>) {
  const { container = globalThis?.document?.body, ...restProps } = props;
  return container
    ? ReactDOM.createPortal(<div {...restProps} ref={ref} />, container)
    : null;
}

const Component = React.forwardRef(Portal);
Component.displayName = 'Portal';

const Root = Component;

export { Component as Portal, Root };
export type { PortalProps };
