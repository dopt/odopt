import { inject, onBeforeUnmount, ref, Ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';
import {
  CountableField,
  FilterableField,
  ChecklistItem as SemanticChecklistItem,
  Checklist as SemanticChecklist,
} from '@dopt/semantic-data-layer-checklist';
import {
  ChecklistItem as ChecklistItemClass,
  Checklist as ChecklistClass,
} from '@dopt/javascript';
import { Children } from '@dopt/core-rich-text';

/**
 * ChecklistItem generally follows the card interface
 * specified in @dopt/semantic-data-layer-checklist.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface ChecklistItem {
  id: Ref<string>;
  index: Ref<number | null | undefined>;
  title: Ref<string | null | undefined>;
  body: Ref<Children | null | undefined>;
  completeLabel: Ref<string | null | undefined>;
  done: Ref<boolean>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  skipped: Ref<boolean>;
  complete: () => void;
  skip: () => void;
}

/**
 * Checklist generally follows the card interface
 * specified in @dopt/semantic-data-layer-checklist.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface Checklist {
  id: Ref<string>;
  title: Ref<string | null | undefined>;
  body: Ref<Children | null | undefined>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  dismissed: Ref<boolean>;
  size: Ref<number>;
  complete: () => void;
  dismiss: () => void;
  items: () => ChecklistItem[];
  filter(on: FilterableField): ChecklistItem[];
  count(where: CountableField): number;
}

function updateChecklist(
  checklist: Checklist,
  _checklist: ChecklistClass
): void {
  checklist.id.value = _checklist.id;
  checklist.title.value = _checklist.title;
  checklist.body.value = _checklist.body;
  checklist.active.value = _checklist.active;
  checklist.completed.value = _checklist.completed;
  checklist.dismissed.value = _checklist.dismissed;
  checklist.size.value = _checklist.size;

  const itemsById = checklist.items().reduce((acc, item) => {
    acc.set(item.id.value, item);
    return acc;
  }, new Map<string, ChecklistItem>());

  const newItems = [] as ChecklistItem[];

  _checklist.items.forEach((_item) => {
    const item = itemsById.get(_item.id);
    if (item) {
      updateItem(item, _item);
    } else {
      newItems.push(createItem(_item));
    }
  });

  checklist.items().push(...newItems);
}

function createChecklist(_checklist: ChecklistClass): Checklist {
  const items = _checklist.items.map((_item) => createItem(_item));

  const checklist = {
    id: ref(_checklist.id),
    title: ref(_checklist.title),
    body: ref(_checklist.body),
    active: ref(_checklist.active),
    completed: ref(_checklist.completed),
    dismissed: ref(_checklist.dismissed),
    size: ref(_checklist.size),
    complete: () => _checklist.complete(),
    dismiss: () => _checklist.dismiss(),
    items: () => items,
    filter: (on: FilterableField) => {
      const filtered = new Set(_checklist.filter(on).map((_item) => _item.id));
      return items.filter(({ id }) => filtered.has(id.value));
    },
    count: (where: CountableField) => {
      return _checklist.count(where);
    },
  } satisfies Record<keyof SemanticChecklist, NonNullable<unknown>>;

  return checklist;
}

function updateItem(item: ChecklistItem, _item: ChecklistItemClass): void {
  item.id.value = _item.id;
  item.index.value = _item.index;
  item.title.value = _item.title;
  item.body.value = _item.body;
  item.completeLabel.value = _item.completeLabel;
  item.done.value = _item.done;
  item.active.value = _item.active;
  item.completed.value = _item.completed;
  item.skipped.value = _item.skipped;
}

function createItem(_item: ChecklistItemClass): ChecklistItem {
  return {
    id: ref(_item.id),
    complete: () => _item.complete(),
    skip: () => _item.skip(),
    index: ref(_item.index),
    title: ref(_item.title),
    body: ref(_item.body),
    completeLabel: ref(_item.completeLabel),
    done: ref(_item.done),
    active: ref(_item.active),
    completed: ref(_item.completed),
    skipped: ref(_item.skipped),
  } satisfies Record<keyof SemanticChecklistItem, NonNullable<unknown>>;
}

/**
 * Returns the {@link ChecklistItem} associated with this `id`.
 *
 * @example
 * ```js
 * const checklistItem = useChecklistItem("flow-two.my-checklist-item");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the checklist item.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link ChecklistItem} instance corresponding to the id.
 */
export function useChecklistItem(
  id: SemanticChecklistItem['id']
): ChecklistItem {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useChecklistItem` without using DoptPlugin');
  }

  const _item = dopt.checklistItem(id);
  const item: ChecklistItem = createItem(_item);

  const unsubscribeItem = _item.subscribe(() => {
    updateItem(item, _item);
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeItem();
  });

  return item;
}

/**
 * Returns the {@link Checklist} associated with this `id`.
 *
 * @example
 * ```js
 * const checklist = useChecklist("flow-two.my-checklist");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link Checklist} instance corresponding to the id.
 */
export function useChecklist(id: SemanticChecklist['id']): Checklist {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useChecklist` without using DoptPlugin');
  }

  const _checklist = dopt.checklist(id);
  const checklist: Checklist = createChecklist(_checklist);

  const unsubscribeChecklist = _checklist.subscribe(() => {
    updateChecklist(checklist, _checklist);
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeChecklist();
  });

  return checklist;
}
