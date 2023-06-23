import { Block, Container } from '@dopt/react';

import { displayIndexComparator } from '@dopt/react-utilities';

import type {
  Checklist,
  ChecklistItem,
} from '@dopt/semantic-data-layer-checklist';

export function transform(container: Container): Checklist {
  const { children } = container;
  const items = children.sort(displayIndexComparator).map(transformItem);

  return {
    id: container.sid,

    title: container.field<string>('title'),
    body: container.field<string>('body'),

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

export function transformItem(
  block: Block<['complete', 'skip']>
): ChecklistItem {
  return {
    id: block.sid,

    title: block.field<string>('title'),
    body: block.field<string>('body'),
    completeLabel: block.field<string>('complete-label'),

    active: block.state.active,

    completed: block.transitioned.complete || false,
    skipped: block.transitioned.skip || false,

    complete: () => block.transition('complete'),
    skip: () => block.transition('skip'),
  };
}
