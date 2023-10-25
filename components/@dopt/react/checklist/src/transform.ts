import type { Children } from '@dopt/core-rich-text';
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

  const transformed: Checklist = {
    id: container.sid,

    title: container.field<string>('title'),
    body: container.field<Children>('body'),

    items,

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
      return items.filter((item) => {
        switch (on) {
          case 'completed':
            return item.completed;
          case 'not-completed':
            return !item.completed;
          case 'skipped':
            return item.skipped;
          case 'not-skipped':
            return !item.skipped;
          case 'active':
            return item.active;
          case 'not-active':
            return !item.active;
          case 'done':
            return item.completed || item.skipped;
          case 'not-done':
            return !(item.completed || item.skipped);
        }
      });
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
    body: block.field<Children>('body'),
    completeLabel: block.field<string>('complete-label'),

    done: !!(block.transitioned.complete || block.transitioned.skip),

    active: block.state.active,

    completed: block.transitioned.complete || false,
    skipped: block.transitioned.skip || false,

    field: (name: string) => block.field(name),

    complete: () => block.transition('complete'),
    skip: () => block.transition('skip'),
  };
}
