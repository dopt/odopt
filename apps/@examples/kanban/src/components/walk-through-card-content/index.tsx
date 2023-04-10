import { PropsWithChildren } from 'react';
import { useBlock } from '@dopt/react-old';
import ReactMarkdown from 'react-markdown';
import { Alert, Text } from '@mantine/core';

export interface WalkThroughContentProps extends PropsWithChildren {
  block: Parameters<typeof useBlock>[0];
}

export function WalkThroughCardContent(props: WalkThroughContentProps) {
  const [block] = useBlock(props.block);

  return block.state.active ? (
    <Alert>
      <Text span>
        <ReactMarkdown>
          {block.getField<string>('card-content') || ''}
        </ReactMarkdown>
      </Text>
    </Alert>
  ) : null;
}
