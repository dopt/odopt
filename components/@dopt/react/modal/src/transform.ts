import type { Children } from '@dopt/core-rich-text';
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

    title: block.field<string>('title'),
    body: block.field<Children>('body'),

    completeLabel: block.field<string>('complete-label'),
    dismissLabel: block.field<string>('dismiss-label'),

    active: block.state.active,

    completed: block.transitioned.complete || false,
    dismissed: block.transitioned.dismiss || false,

    field: (name: string) => block.field(name),

    complete: () => transition('complete'),
    dismiss: () => transition('dismiss'),
  };
}
