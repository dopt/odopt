import { PropsWithChildren } from 'react';

import { hotspotClass, hotspotPopover } from './index.css';

import * as Popover from '@radix-ui/react-popover';

interface Props extends PropsWithChildren {
  visible?: boolean;
  position: 'nw' | 'ne' | 'se' | 'sw';
}

export function HotSpot({ children, position, visible = true }: Props) {
  if (!visible) {
    return null;
  }
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div className={hotspotClass({ position })}></div>
      </Popover.Trigger>
      <Popover.Portal style={{ zIndex: 4 }}>
        <Popover.Content
          avoidCollisions={true}
          align="start"
          side="right"
          sideOffset={4}
          className={hotspotPopover}
        >
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
