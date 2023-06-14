import { Block, BlockTransition } from '@dopt/react';

import type { Modal } from '@dopt/semantic-data-layer-modal';

export function transform({
  block,
  transition,
}: {
  block: Block;
  transition: BlockTransition<['complete', 'dismiss']>;
}): Modal {
  return {
    title: block.field('title', ''),
    body: block.field('body', ''),
    completeLabel: block.field('complete-label', ''),
    dismissLabel: block.field('dismiss-label', ''),
    active: block.state.active,
    complete: () => transition('complete'),
    dismiss: () => transition('dismiss'),
  };
}
