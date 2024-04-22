import * as classes from './styles.css';
import { classNameRoot } from './const';

import React, { type ComponentPropsWithRef } from 'react';

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

export type Measurable = { getBoundingClientRect(): ClientRect };

export interface ContextualAssistantPopoverProps
  extends ComponentPropsWithRef<'div'>,
    StyleProps {
  anchor: Measurable;
  position?: Side;
  alignment?: Alignment | 'center';
  offset?: number;
}

const popoverClassName = `${classNameRoot}__popover` as const;

function ContextualAssistantPopover(props: ContextualAssistantPopoverProps) {
  const {
    alignment = 'center',
    anchor,
    children,
    className,
    offset: assistantOffset = 10,
    position = 'top',
    style,
    theme: injectedTheme,
    ...restProps
  } = props;

  const theme = useTheme(injectedTheme, true);

  const { refs, floatingStyles, placement } = useFloating({
    middleware: [
      offset(assistantOffset),
      flip({
        fallbackAxisSideDirection: 'end',
      }),
      shift(),
    ],
    placement: alignment === 'center' ? position : `${position}-${alignment}`,
    whileElementsMounted: autoUpdate,
    elements: {
      reference: anchor,
    },
  });

  if (!anchor) {
    return null;
  }

  const [computedPosition, computedAlignment] =
    getPositionAndAlignFromPlacement(placement);

  return (
    <Portal>
      <div
        className={clsx([
          themeClassName({
            theme,
            className: classes.contextualAssistantPopover({
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

function getPositionAndAlignFromPlacement(placement: Placement) {
  const [position, align = 'center'] = placement.split('-');
  return [position as Side, align as Alignment | 'center'] as const;
}

export { ContextualAssistantPopover as Popover };
