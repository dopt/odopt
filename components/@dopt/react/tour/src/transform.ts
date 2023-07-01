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

  const tour: Tour = {
    id: container.sid,

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
    count: (where: CountableField) => tour.filter(where).length,
  } as Tour;

  const items: TourItem[] = children
    .sort(displayIndexComparator)
    .map((child) => transformItem(child, tour));

  tour.items = items;

  return tour;
}

export function transformItem(
  block: Block<['previous', 'next']>,
  tour: Tour
): TourItem {
  return {
    id: block.sid,

    get tour() {
      return tour;
    },

    index: block.field<number>('display-index'),

    title: block.field<string>('title'),
    body: block.field<RichText>('body'),

    backLabel: block.field<string>('back-label'),
    nextLabel: block.field<string>('next-label'),

    active: block.state.active,

    completed: block.transitioned.next || false,

    next: () => block.transition('next'),
    back: () => block.transition('previous'),
  };
}
