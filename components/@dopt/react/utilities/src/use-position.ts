export type Placement = 'top' | 'bottom' | 'left' | 'right';
export type Alignment = 'top' | 'bottom' | 'left' | 'right';

export const FLOATING_OFFSET = 6;

interface Props {
  anchor: HTMLElement | null;
  alignment: Alignment;
  element: HTMLDivElement | null;
  placement: Placement;
}

export type Position = {
  left: number;
  top: number;
} | null;

export function usePosition({
  anchor,
  alignment,
  element,
  placement,
}: Props): Position {
  let left = -1;
  let top = -1;

  if (!anchor || !element) {
    return null;
  }

  if (
    anchor.offsetTop == null ||
    anchor.offsetLeft == null ||
    anchor.offsetHeight == null ||
    anchor.offsetWidth == null ||
    element.offsetHeight == null ||
    element.offsetWidth == null
  ) {
    return null;
  }

  const position = {
    top: anchor.offsetTop,
    left: anchor.offsetLeft,
    bottom: anchor.offsetHeight + anchor.offsetTop,
    right: anchor.offsetWidth + anchor.offsetLeft,
  };

  switch (placement) {
    case 'top':
      top = position.top - FLOATING_OFFSET - element.offsetHeight;
      break;
    case 'bottom':
      top = position.bottom + FLOATING_OFFSET;
      break;
    case 'left':
      left = position.left - element.offsetWidth - FLOATING_OFFSET;
      break;
    case 'right':
      left = position.left + anchor.offsetWidth + FLOATING_OFFSET;
      break;
  }

  switch (alignment) {
    case 'top':
      top = position.top;
      break;
    case 'bottom':
      top = position.top + anchor.offsetHeight - element.offsetHeight;
      break;
    case 'left':
      left = position.left;
      break;
    case 'right':
      left = position.left - element.offsetWidth + anchor.offsetWidth;
      break;
  }

  return { left, top };
}
