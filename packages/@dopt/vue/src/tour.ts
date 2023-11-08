import { inject, onBeforeUnmount, ref, Ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';
import {
  TourItem as SemanticTourItem,
  Tour as SemanticTour,
  CountableField,
  FilterableField,
} from '@dopt/semantic-data-layer-tour';
import { TourItem as TourItemClass, Tour as TourClass } from '@dopt/javascript';
import { Children } from '@dopt/core-rich-text';
import { Block, createFieldGetter, useInitializeFields } from './block';

/**
 * TourItem generally follows the card interface
 * specified in @dopt/semantic-data-layer-tour.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface TourItem {
  id: Ref<string>;
  index: Ref<number | null | undefined>;
  title: Ref<string | null | undefined>;
  body: Ref<Children | null | undefined>;
  nextLabel: Ref<string | null | undefined>;
  backLabel: Ref<string | null | undefined>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  tour: Ref<() => Tour | undefined>;
  next: () => void;
  back: () => void;
  /**
   * Use this to access custom fields on the tour item.
   */
  field: Block['field'];
}

/**
 * Tour generally follows the card interface
 * specified in @dopt/semantic-data-layer-tour.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface Tour {
  id: Ref<string>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  dismissed: Ref<boolean>;
  size: Ref<number>;
  complete: () => void;
  dismiss: () => void;
  items: Ref<() => TourItem[]>;
  filter: Ref<(on: FilterableField) => TourItem[]>;
  count: Ref<(where: CountableField) => number>;
  /**
   * Use this to access custom fields on the tour.
   */
  field: Block['field'];
}

function createTourFilter(items: TourItem[], _tour: TourClass) {
  return (on: FilterableField) => {
    const filtered = new Set(_tour.filter(on).map((_item) => _item.id));
    return items.filter(({ id }) => filtered.has(id.value));
  };
}

function createTourCount(_tour: TourClass) {
  return (where: CountableField) => {
    return _tour.count(where);
  };
}

function updateTour(tour: Tour, _tour: TourClass): void {
  tour.id.value = _tour.id;
  tour.active.value = _tour.active;
  tour.completed.value = _tour.completed;
  tour.dismissed.value = _tour.dismissed;
  tour.size.value = _tour.size;

  const itemsById = tour.items.value().reduce((acc, item) => {
    acc.set(item.id.value, item);
    return acc;
  }, new Map<string, TourItem>());

  const items = _tour.items.map((_item) => {
    const item = itemsById.get(_item.id);
    if (item) {
      updateItem(item, _item);
      return item;
    } else {
      return createItem(_item, tour);
    }
  });

  /**
   * Update all refs related to children.
   */
  tour.items.value = () => items;
  tour.filter.value = createTourFilter(items, _tour);
  tour.count.value = createTourCount(_tour);
}

function createTour(_tour: TourClass): Tour {
  const items = [] as TourItem[];
  const tour = {
    id: ref(_tour.id),
    active: ref(_tour.active),
    completed: ref(_tour.completed),
    dismissed: ref(_tour.dismissed),
    size: ref(_tour.size),
    complete: () => _tour.complete(),
    dismiss: () => _tour.dismiss(),
    items: ref(() => items),
    field: ref(createFieldGetter(_tour)),
    filter: ref(createTourFilter(items, _tour)),
    count: ref(createTourCount(_tour)),
  } satisfies Record<keyof SemanticTour, NonNullable<unknown>>;

  _tour.items.forEach((_item) => {
    items.push(createItem(_item, tour));
  });

  return tour;
}

function updateItem(item: TourItem, _item: TourItemClass): void {
  item.id.value = _item.id;
  item.index.value = _item.index;
  item.title.value = _item.title;
  item.body.value = _item.body;
  item.nextLabel.value = _item.nextLabel;
  item.backLabel.value = _item.backLabel;
  item.active.value = _item.active;
  item.completed.value = _item.completed;
}

function createItem(_item: TourItemClass, tour: Tour | undefined): TourItem {
  return {
    id: ref(_item.id),
    tour: ref(() => tour),
    next: () => _item.next(),
    back: () => _item.back(),
    field: ref(createFieldGetter(_item)),
    index: ref(_item.index),
    title: ref(_item.title),
    body: ref(_item.body),
    nextLabel: ref(_item.nextLabel),
    backLabel: ref(_item.backLabel),
    active: ref(_item.active),
    completed: ref(_item.completed),
  } satisfies Record<keyof SemanticTourItem, NonNullable<unknown>>;
}

/**
 * Returns the {@link TourItem} associated with this `id`.
 *
 * @example
 * ```js
 * const tourItem = useTourItem("flow-three.my-tour-item");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the checklist item.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link TourItem} instance corresponding to the id.
 */
export function useTourItem(id: SemanticTourItem['id']): TourItem {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useTourItem` without using DoptPlugin');
  }

  const _item = dopt.tourItem(id);
  const item: TourItem = createItem(
    _item,
    _item.tour != null ? createTour(_item.tour) : undefined
  );

  let maybeUnsubscribeTour = () => {
    /* no-op */
  };

  const maybeSubscribeTour = () => {
    const _tour = _item.tour;
    if (_tour && !item.tour.value()) {
      /**
       * Defensively clean up any old listeners
       */
      maybeUnsubscribeTour();

      item.tour.value = () => createTour(_tour);
      maybeUnsubscribeTour = _tour.subscribe(() => {
        const tour = item.tour.value();
        if (_tour && tour) {
          updateTour(tour, _tour);
        }
      });
    }
  };

  useInitializeFields(item.field, _item);

  const unsubscribeItem = _item.subscribe(() => {
    /**
     * If the tour item previously had no ref to its parent,
     * overwrite the tour parent to trigger that it's ready.
     *
     * This ensures that users who are referring to the parent
     * get an update.
     */
    maybeSubscribeTour();

    updateItem(item, _item);
  });

  maybeSubscribeTour();

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeItem();
    maybeUnsubscribeTour();
  });

  return item;
}

/**
 * Returns the {@link Tour} associated with this `id`.
 *
 * @example
 * ```js
 * const tour = useTour("flow-three.my-tour");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link Tour} instance corresponding to the id.
 */
export function useTour(id: SemanticTour['id']): Tour {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useTour` without using DoptPlugin');
  }

  const _tour = dopt.tour(id);
  const tour = createTour(_tour);

  useInitializeFields(tour.field, _tour);

  const unsubscribeTour = _tour.subscribe(() => {
    updateTour(tour, _tour);
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeTour();
  });

  return tour;
}
