import { Block, BlockTransition } from '@dopt/react';

import type { Modal } from '@dopt/semantic-data-layer-modal';

export function transform({
  block,
  transition,
}: {
  block: Block<['complete', 'dismiss']>;
  transition: BlockTransition<['complete', 'dismiss']>;
}): Modal {
  return {
    id: block.sid,

    title: block.field('title', '') || '',
    body: block.field('body', '') || '',

    completeAction: block.field('complete-action', '') || '',
    dismissAction: block.field('dismiss-action', '') || '',

    active: block.state.active,

    completed: block.transitioned.complete || false,
    dismissed: block.transitioned.dismiss || false,

    complete: () => transition('complete'),
    dismiss: () => transition('dismiss'),
  };
}
