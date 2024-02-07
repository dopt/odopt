import React, { useEffect, useState } from 'react';

export const DEFAULT_SELECTORS = [
  'input',
  'button',
  'select',
  'textarea',
  'input',
  'label',
  'a',
  '[role="button"]',
];

interface Props {
  active: boolean;
  selection: HTMLElement | null;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSelection: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  scope?: 'window' | string | HTMLElement | React.RefObject<HTMLElement>;
  selectors?: string[];
}

export function useHighlights({
  active,
  setActive,
  setSelection,
  selectors,
  scope,
}: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  const [rect, setRect] = useState<
    Pick<DOMRect, 'width' | 'height' | 'top' | 'left'>
  >({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  const element = resolveScope({ scope });

  useEffect(() => {
    /*
     * If the contextual assistant isn't active, no need
     * to bind expensive listeners / do work.
     */
    if (!active) {
      return;
    }

    function onMouseOver(e: Event) {
      const target = e.target as HTMLElement;
      const offset = target.getBoundingClientRect();

      if (active) {
        if (
          (selectors || DEFAULT_SELECTORS).some((selector) =>
            target.matches(selector)
          )
        ) {
          setVisible(true);

          setRect(offset);
        } else {
          setVisible(false);
        }
      }
    }

    element.addEventListener('mouseover', onMouseOver);
    return () => element.removeEventListener('mouseover', onMouseOver);
  }, [active, setActive, selectors, element]);

  useEffect(() => {
    function onClick(e: Event) {
      console.log('click handler on window');
      const target = e.target as HTMLElement;

      if (active) {
        /*
         * If the highlights are active and we get a click,
         * we will assume it's on an overlay element.
         *
         * CSS transitions and timing may prove this to be
         * not true in which case we will need to be more
         * surgical and probably test if the events x/y
         * coordintes are in the overlays bounding rect.
         */
        e.stopPropagation();

        /*
         * Clicks on an overlay
         * 1. Disable the highlight on hover mode
         * 2. Fix the highlight to the clicked element
         */
        setActive(false);
        setSelection(target);
        setVisible(true);
      } else {
        setSelection(null);
        setVisible(false);
      }
    }
    if (active || visible) {
      element.addEventListener('click', onClick, { capture: true });
    }
    return () => element.removeEventListener('click', onClick);
  }, [active, setActive, setSelection, selectors, visible, element]);

  return {
    visible,
    rect,
  };
}

function resolveScope({ scope }: Pick<Props, 'scope'>) {
  if (typeof scope === 'string') {
    switch (scope) {
      case 'window':
        return window;
      default:
        const element = document.querySelector(scope);
        if (!element) {
          throw new Error(`Unable to locate element for scope ${scope}.`);
        }
        return element;
    }
  } else if (scope instanceof HTMLElement) {
    return scope;
  } else if (typeof scope === 'object') {
    const element = scope.current;
    if (!element) {
      throw new Error(`Unable to locate element for scope ${scope}.`);
    }
    return element;
  }
  throw new Error('Unable to scope highlights');
}
