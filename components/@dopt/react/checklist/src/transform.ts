import { Block, Container } from '@dopt/react';

import type { Checklist } from '@dopt/semantic-data-layer-checklist';

export function transform(container: Container): Checklist {
  const { children } = container;
  const items = children.map(transformItem);

  return {
    id: container.sid,

    title: container.field('title', ''),
    body: container.field('body', ''),

    items,

    active: container.state.active,

    completed: container.transitioned.complete || false,
    dismissed: container.transitioned.dismiss || false,

    complete: () => container.transition('complete'),
    dismiss: () => container.transition('dismiss'),

    get size() {
      return items.length;
    },

    filter: (fn) => items.filter(fn),
    count: (fn) => {
      if (typeof fn === 'string') {
        switch (fn) {
          case 'completed':
            return items.filter(({ completed }) => !!completed).length;
          case 'incomplete':
            return items.filter(({ completed }) => !completed).length;
          case 'skipped':
            return items.filter(({ skipped }) => skipped).length;
        }
      } else {
        return items.reduce((value, item, i) => {
          return !!fn(item, i) ? value + 1 : value;
        }, 0);
      }
    },
  };
}

export function transformItem(block: Block<['complete', 'skip']>) {
  return {
    id: block.sid,

    title: block.field('title', ''),
    body: block.field('body', ''),
    completeLabel: block.field('complete-label', ''),

    active: block.state.active,

    completed: block.transitioned.complete || false,
    skipped: block.transitioned.skip || false,

    complete: () => block.transition('complete'),
    skip: () => block.transition('skip'),
  };
}
