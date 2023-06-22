import { Block, Container } from '@dopt/react';

import { displayIndexComparator } from '@dopt/react-utilities';

import type { Tour, TourItem } from '@dopt/semantic-data-layer-tour';

export function transform(container: Container): Tour {
  const { children } = container;

  const items = children
    .sort(displayIndexComparator)
    .map((child) => transformItem(child, container));

  return {
    id: container.sid,

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
  block: Block<['previous', 'next']>,
  container: Container
): TourItem {
  return {
    id: block.sid,

    index: block.field('display-index', 0),

    title: block.field('title', ''),
    body: block.field('body', ''),

    backLabel: block.field('back-label', ''),
    nextLabel: block.field('next-label', ''),

    active: block.state.active,

    completed: block.transitioned.next || false,

    next: () => block.transition('next'),
    back: () => block.transition('previous'),

    dismiss: () => container.transition('dismiss'),
  };
}
