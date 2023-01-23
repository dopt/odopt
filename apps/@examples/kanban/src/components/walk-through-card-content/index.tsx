import { PropsWithChildren } from 'react';
import { useBlock } from '@dopt/react';
import { Alert, Text } from '@mantine/core';

export interface WalkThroughContentProps extends PropsWithChildren {
  block: Parameters<typeof useBlock>[0];
}

export function WalkThroughCardContent(props: WalkThroughContentProps) {
  const [block] = useBlock(props.block);

  return block.state.active ? (
    <Alert>
      <Text span>{props.children}</Text>
    </Alert>
  ) : null;
}
