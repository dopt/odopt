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
  selection,
  setSelection,
  selectors,
  scope,
}: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!selection) {
      setVisible(false);
    }
  }, [selection]);

  const [highlight, setHighlight] = useState<
    Pick<DOMRect, 'width' | 'height'> & {
      element: Element | null;
    }
  >({
    width: 0,
    height: 0,
    element: null,
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

          setHighlight({
            width: offset.width,
            height: offset.height,
            element: target,
          });
        } else {
          setVisible(false);
        }
      }
    }

    element.addEventListener('mouseover', onMouseOver);
    return () => element.removeEventListener('mouseover', onMouseOver);
  }, [active, setActive, selectors, element]);

  useEffect(() => {
    function onKeyPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelection(null);
        setVisible(false);
        setActive(false);
      }
    }

    if (active || visible) {
      document.addEventListener('keydown', onKeyPress);
    }
    return () => document.removeEventListener('keydown', onKeyPress);
  }, [active, visible, setActive, setSelection]);

  useEffect(() => {
    function captureClick(e: Event) {
      e.stopImmediatePropagation();
      e.preventDefault();
      window.removeEventListener('click', captureClick, true);
    }

    function onPointerDown(e: Event) {
      const target = e.target as HTMLElement;

      if (active) {
        e.stopImmediatePropagation();
        e.preventDefault();

        window.addEventListener('click', captureClick, true);
        /*
         * If the highlights are active and we get a click,
         * we will assume it's on an overlay element.
         *
         * CSS transitions and timing may prove this to be
         * not true in which case we will need to be more
         * surgical and probably test if the events x/y
         * coordintes are in the overlays bounding rect.
         */

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
    if (active) {
      element.addEventListener('pointerdown', onPointerDown, { capture: true });
    }
    return () =>
      element.removeEventListener('pointerdown', onPointerDown, {
        capture: true,
      });
  }, [active, setActive, setSelection, selectors, visible, element]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (visible) {
        const popover = document.querySelector(
          '.dopt-contextual-assistant__popover'
        );

        if (!popover) {
          return;
        }

        const { left, right, top, bottom } = popover.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;

        // Click is outside popover
        if (x <= left || x >= right || y <= top || y >= bottom) {
          setSelection(null);
          setVisible(false);
        }
      }
    }
    if (visible) {
      window.addEventListener('pointerdown', onClick);
    }
    return () => window.removeEventListener('pointerdown', onClick);
  }, [active, setActive, setSelection, selectors, visible, element]);

  return {
    visible,
    highlight,
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
