import * as classes from './styles.css';
import { classNameRoot } from '../const';

import React, { useContext, type ComponentPropsWithRef } from 'react';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  Side,
  Alignment,
  Placement,
} from '@floating-ui/react-dom';
import clsx from 'clsx';

import {
  type StyleProps,
  themeClassName,
  themeStyle,
  useTheme,
} from '@dopt/react-theme';

import Portal from '@dopt/react-portal';
import { HintsItemContext } from './root';

export interface PopoverProps extends ComponentPropsWithRef<'div'>, StyleProps {
  position?: Side;
  alignment?: Alignment | 'center';
  offset?: number;
  open?: boolean;
}

const popoverClassName = classNameRoot;

function HintsPopover(props: PopoverProps) {
  const {
    theme: injectedTheme,
    className,
    style,
    children,
    offset: popoverOffset = 10,
    position = 'top',
    alignment = 'center',
    open,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme, true);

  const { active, anchor } = useContext(HintsItemContext);

  const { refs, floatingStyles, placement } = useFloating({
    middleware: [offset(popoverOffset), flip(), shift()],
    placement: alignment === 'center' ? position : `${position}-${alignment}`,
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchor,
    },
  });

  if (!active || !anchor || !open) {
    return null;
  }

  const [computedPosition, computedAlignment] =
    getPositonAndAlignFromPlacement(placement);

  return (
    <Portal>
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.hintsItemPopover({
              position: computedPosition,
              alignment: computedAlignment,
            }),
          }),
          popoverClassName,
          `${popoverClassName}--${computedPosition}`,
          `${popoverClassName}--${computedAlignment}`,
          className,
        ])}
        style={themeStyle({ theme, style: { ...style, ...floatingStyles } })}
        data-position={computedPosition}
        data-alignment={computedAlignment}
        {...restProps}
        ref={refs.setFloating}
      >
        {children}
      </div>
    </Portal>
  );
}

function getPositonAndAlignFromPlacement(placement: Placement) {
  const [position, align = 'center'] = placement.split('-');
  return [position as Side, align as Alignment | 'center'] as const;
}

const Popover = HintsPopover;
export { Popover };
