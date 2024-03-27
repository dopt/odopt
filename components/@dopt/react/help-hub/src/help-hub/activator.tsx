import React, {
  Children,
  type ForwardedRef,
  type ReactElement,
  cloneElement,
  useContext,
  forwardRef,
  type ComponentPropsWithRef,
  useEffect,
  useRef,
} from 'react';

import { useComposedRefs } from '@radix-ui/react-compose-refs';

import { HelpHubContext } from './root';

export interface ActivatorProps
  extends ComponentPropsWithRef<React.ElementType<any>> {
  children: ReactElement;
}

function HelpHubActivator(
  props: ActivatorProps,
  forwardedRef?: ForwardedRef<HTMLElement>
) {
  const { children, ...anchorProps } = props;

  const { setActivator } = useContext(HelpHubContext);

  const ref = useRef(null);

  const composedRefs = useComposedRefs(forwardedRef, ref);

  const anchorElement = Children.only(children);

  useEffect(() => {
    setActivator(ref.current);
  });

  return cloneElement(anchorElement, {
    ...anchorProps,
    ref: composedRefs,
  });
}

const Activator = forwardRef(HelpHubActivator);
export { Activator };
