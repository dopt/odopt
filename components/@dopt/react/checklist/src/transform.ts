import { Block, Container } from '@dopt/react';

import { displayIndexComparator } from '@dopt/react-utilities';

import type {
  Checklist,
  ChecklistItem,
  FilterableField,
  CountableField,
} from '@dopt/semantic-data-layer-checklist';

export function transform(container: Container): Checklist {
  const { children } = container;
  const items = children.sort(displayIndexComparator).map(transformItem);

  const transformed = {
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

    filter: (on: FilterableField) => {
      switch (on) {
        case 'completed':
          return items.filter(({ completed }) => !!completed);
        case 'not-completed':
          return items.filter(({ completed }) => !completed);
        case 'skipped':
          return items.filter(({ skipped }) => !!skipped);
        case 'not-skipped':
          return items.filter(({ skipped }) => !skipped);
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
  block: Block<['complete', 'skip']>
): ChecklistItem {
  return {
    id: block.sid,

    index: block.field<number>('display-index'),

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
