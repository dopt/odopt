import { IconSettings } from '@tabler/icons';
import { forwardRef, ForwardedRef } from 'react';

function Settings(_: any, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div ref={ref}>
      <IconSettings />
    </div>
  );
}

const Component = forwardRef(Settings);
Component.displayName = 'Settings';
export { Component as Settings };
