import React, { PropsWithChildren } from 'react';

import { tourClass, tourPopover } from './index.css';

import * as Popover from '@radix-ui/react-popover';

interface Props extends PropsWithChildren {
  visible?: boolean;
  align: Popover.PopoverContentProps['align'];
  side: Popover.PopoverContentProps['side'];
}

export function TourStep({ children, align, side, visible = true }: Props) {
  const [trigger, content] = React.Children.toArray(children);

  return (
    <Popover.Root open={visible}>
      <Popover.Trigger asChild>
        <div className={tourClass}>{trigger}</div>
      </Popover.Trigger>
      <Popover.Portal style={{ zIndex: 4 }}>
        <Popover.Content
          avoidCollisions={true}
          align={align}
          side={side}
          sideOffset={4}
          className={tourPopover}
        >
          {content}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
