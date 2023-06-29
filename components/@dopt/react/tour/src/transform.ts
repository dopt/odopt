import { RichText } from '@dopt/core-rich-text';
import { Block, Container } from '@dopt/react';

import { displayIndexComparator } from '@dopt/react-utilities';

import type {
  Tour,
  TourItem,
  FilterableField,
  CountableField,
} from '@dopt/semantic-data-layer-tour';

export function transform(container: Container): Tour {
  const { children } = container;

  const items = children
    .sort(displayIndexComparator)
    .map((child) => transformItem(child, container));

  const transformed = {
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

    filter: (on: FilterableField) => {
      switch (on) {
        case 'completed':
          return items.filter(({ completed }) => !!completed);
        case 'not-completed':
          return items.filter(({ completed }) => !completed);
        case 'active':
          return items.filter(({ active }) => !!active);
        case 'not-active':
          return items.filter(({ active }) => !active);
      }
    },
    count: (where: CountableField) => transformed.filter(where).length,
  };

  return transformed;
}

export function transformItem(
  block: Block<['previous', 'next']>,
  container: Container
): TourItem {
  return {
    id: block.sid,

    index: block.field<number>('display-index'),

    title: block.field<string>('title'),
    body: block.field<RichText>('body'),

    backLabel: block.field<string>('back-label'),
    nextLabel: block.field<string>('next-label'),

    active: block.state.active,

    completed: block.transitioned.next || false,

    next: () => block.transition('next'),
    back: () => block.transition('previous'),

    dismiss: () => container.transition('dismiss'),
  };
}