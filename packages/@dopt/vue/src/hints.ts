import { inject, onBeforeUnmount, ref, Ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';
import {
  HintsItem as SemanticHintsItem,
  Hints as SemanticHints,
  CountableField,
  FilterableField,
} from '@dopt/semantic-data-layer-hints';
import {
  HintsItem as HintsItemClass,
  Hints as HintsClass,
} from '@dopt/javascript';
import { Children } from '@dopt/core-rich-text';
import { Block, createFieldGetter, useInitializeFields } from './block';

/**
 * HintsItem generally follows the card interface
 * specified in @dopt/semantic-data-layer-hints.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface HintsItem {
  id: Ref<string>;
  index: Ref<number | null | undefined>;
  title: Ref<string | null | undefined>;
  body: Ref<Children | null | undefined>;
  completeLabel: Ref<string | null | undefined>;
  dismissAllLabel: Ref<string | null | undefined>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  dismissed: Ref<boolean>;
  hints: Ref<() => Hints | undefined>;
  complete: () => void;
  dismiss: () => void;
  /**
   * Use this to access custom fields on the hints item.
   */
  field: Block['field'];
}

/**
 * Hints generally follows the card interface
 * specified in @dopt/semantic-data-layer-hints.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface Hints {
  id: Ref<string>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  dismissed: Ref<boolean>;
  size: Ref<number>;
  complete: () => void;
  dismiss: () => void;
  items: Ref<() => HintsItem[]>;
  filter: Ref<(on: FilterableField) => HintsItem[]>;
  count: Ref<(where: CountableField) => number>;
  /**
   * Use this to access custom fields on the hints container.
   */
  field: Block['field'];
}

function createHintsFilter(items: HintsItem[], _hints: HintsClass) {
  return (on: FilterableField) => {
    const filtered = new Set(_hints.filter(on).map((_item) => _item.id));
    return items.filter(({ id }) => filtered.has(id.value));
  };
}

function createHintsCount(_hints: HintsClass) {
  return (where: CountableField) => {
    return _hints.count(where);
  };
}

function updateHints(hints: Hints, _hints: HintsClass): void {
  hints.id.value = _hints.id;
  hints.active.value = _hints.active;
  hints.completed.value = _hints.completed;
  hints.dismissed.value = _hints.dismissed;
  hints.size.value = _hints.size;

  const itemsById = hints.items.value().reduce((acc, item) => {
    acc.set(item.id.value, item);
    return acc;
  }, new Map<string, HintsItem>());

  const items = _hints.items.map((_item) => {
    const item = itemsById.get(_item.id);
    if (item) {
      updateItem(item, _item);
      return item;
    } else {
      return createItem(_item, hints);
    }
  });

  /**
   * Update all refs related to children.
   */
  hints.items.value = () => items;
  hints.filter.value = createHintsFilter(items, _hints);
  hints.count.value = createHintsCount(_hints);
}

function createHints(_hints: HintsClass): Hints {
  const items = [] as HintsItem[];
  const hints = {
    id: ref(_hints.id),
    active: ref(_hints.active),
    completed: ref(_hints.completed),
    dismissed: ref(_hints.dismissed),
    size: ref(_hints.size),
    field: ref(createFieldGetter(_hints)),
    complete: () => _hints.complete(),
    dismiss: () => _hints.dismiss(),
    items: ref(() => items),
    filter: ref(createHintsFilter(items, _hints)),
    count: ref(createHintsCount(_hints)),
  } satisfies Record<keyof SemanticHints, NonNullable<unknown>>;

  _hints.items.forEach((_item) => {
    items.push(createItem(_item, hints));
  });

  return hints;
}

function updateItem(item: HintsItem, _item: HintsItemClass): void {
  item.id.value = _item.id;
  item.index.value = _item.index;
  item.title.value = _item.title;
  item.body.value = _item.body;
  item.completeLabel.value = _item.completeLabel;
  item.dismissAllLabel.value = _item.dismissAllLabel;
  item.active.value = _item.active;
  item.completed.value = _item.completed;
  item.dismissed.value = _item.dismissed;
}

function createItem(
  _item: HintsItemClass,
  hints: Hints | undefined
): HintsItem {
  return {
    id: ref(_item.id),
    field: ref(createFieldGetter(_item)),
    hints: ref(() => hints),
    complete: () => _item.complete(),
    dismiss: () => _item.dismiss(),
    index: ref(_item.index),
    title: ref(_item.title),
    body: ref(_item.body),
    completeLabel: ref(_item.completeLabel),
    dismissAllLabel: ref(_item.dismissAllLabel),
    active: ref(_item.active),
    completed: ref(_item.completed),
    dismissed: ref(_item.dismissed),
  } satisfies Record<keyof SemanticHintsItem, NonNullable<unknown>>;
}

/**
 * Returns the {@link HintsItem} associated with this `id`.
 *
 * @example
 * ```js
 * const hintsItem = useHintsItem("flow-three.my-hints-item");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the checklist item.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link HintsItem} instance corresponding to the id.
 */
export function useHintsItem(id: SemanticHintsItem['id']): HintsItem {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useHintsItem` without using DoptPlugin');
  }

  const _item = dopt.hintsItem(id);
  const item: HintsItem = createItem(
    _item,
    _item.hints ? createHints(_item.hints) : undefined
  );

  let maybeUnsubscribeHints = () => {
    /* no-op */
  };

  const maybeSubscribeHints = () => {
    const _hints = _item.hints;
    if (_hints && !item.hints.value()) {
      /**
       * Defensively clean up any old listeners
       */
      maybeUnsubscribeHints();

      item.hints.value = () => createHints(_hints);
      maybeUnsubscribeHints = _hints.subscribe(() => {
        const hints = item.hints.value();
        if (_hints && hints) {
          updateHints(hints, _hints);
        }
      });
    }
  };

  useInitializeFields(item.field, _item);

  const unsubscribeItem = _item.subscribe(() => {
    /**
     * If the hints item previously had no ref to its parent,
     * overwrite the hints parent to trigger that it's ready.
     *
     * This ensures that users who are referring to the parent
     * get an update.
     */
    maybeSubscribeHints();

    updateItem(item, _item);
  });

  maybeSubscribeHints();

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeItem();
    maybeUnsubscribeHints();
  });

  return item;
}

/**
 * Returns the {@link Hints} associated with this `id`.
 *
 * @example
 * ```js
 * const hints = useHints("flow-three.my-hints");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link Hints} instance corresponding to the id.
 */
export function useHints(id: SemanticHints['id']): Hints {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useHints` without using DoptPlugin');
  }

  const _hints = dopt.hints(id);
  const hints = createHints(_hints);

  useInitializeFields(hints.field, _hints);

  const unsubscribeHints = _hints.subscribe(() => {
    updateHints(hints, _hints);
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeHints();
  });

  return hints;
}
