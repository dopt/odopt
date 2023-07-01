import {
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

import { TourItemContext } from './root';

export interface AnchorProps
  extends ComponentPropsWithRef<React.ElementType<any>> {
  children: ReactElement;
}

function TourItemAnchor(
  props: AnchorProps,
  forwardedRef?: ForwardedRef<HTMLElement>
) {
  const { children, ...anchorProps } = props;

  const { setAnchor } = useContext(TourItemContext);

  const ref = useRef(null);

  const composedRefs = useComposedRefs(forwardedRef, ref);

  let anchorElement = Children.only(children);

  useEffect(() => {
    setAnchor(ref.current);
  });

  return cloneElement(anchorElement, {
    ...anchorProps,
    ref: composedRefs,
  });
}

const Anchor = forwardRef(TourItemAnchor);
export { Anchor, Anchor as TourItemAnchor };
