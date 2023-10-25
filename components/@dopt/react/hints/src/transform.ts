import type { Children } from '@dopt/core-rich-text';
import { Block, Container } from '@dopt/react';

import { displayIndexComparator } from '@dopt/react-utilities';

import type {
  Hints,
  HintsItem,
  FilterableField,
  CountableField,
} from '@dopt/semantic-data-layer-hints';

export function transform(container: Container): Hints {
  const { children } = container;

  const hints: Hints = {
    id: container.sid,

    active: container.state.active,

    completed: container.transitioned.complete || false,
    dismissed: container.transitioned.dismiss || false,

    field: (name: string) => container.field(name),

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
    count: (where: CountableField) => hints.filter(where).length,
  } as Hints;

  const items: HintsItem[] = children
    .sort(displayIndexComparator)
    .map((child) => transformItem(child, hints));

  hints.items = items;

  return hints;
}

export function transformItem(
  block: Block<['complete', 'dismiss']>,
  hints: Hints
): HintsItem {
  return {
    id: block.sid,

    get hints() {
      return hints;
    },

    index: block.field<number>('display-index'),

    title: block.field<string>('title'),
    body: block.field<Children>('body'),

    completeLabel: block.field<string>('complete-label'),
    dismissAllLabel: block.field<string>('dismiss-all-label'),

    active: block.state.active,

    completed: block.transitioned.complete || false,
    dismissed: block.transitioned.dismiss || false,

    field: (name: string) => block.field(name),

    complete: () => block.transition('complete'),
    dismiss: () => block.transition('dismiss'),
  };
}
