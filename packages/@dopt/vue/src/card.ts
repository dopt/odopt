import { inject, onBeforeUnmount, ref, Ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';
import { Card as SemanticCard } from '@dopt/semantic-data-layer-card';
import { Card as CardClass } from '@dopt/javascript';
import { Children } from '@dopt/core-rich-text';

/**
 * Card generally follows the card interface
 * specified in @dopt/semantic-data-layer-card.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface Card {
  id: Ref<string>;
  title: Ref<string | null | undefined>;
  body: Ref<Children | null | undefined>;
  completeLabel: Ref<string | null | undefined>;
  dismissLabel: Ref<string | null | undefined>;
  active: Ref<boolean>;
  completed: Ref<boolean>;
  dismissed: Ref<boolean>;
  complete: () => void;
  dismiss: () => void;
}

function updateCard(card: Card, _card: CardClass): void {
  card.id.value = _card.id;
  card.title.value = _card.title;
  card.body.value = _card.body;
  card.completeLabel.value = _card.completeLabel;
  card.dismissLabel.value = _card.dismissLabel;
  card.active.value = _card.active;
  card.completed.value = _card.completed;
  card.dismissed.value = _card.dismissed;
}

function createCard(_card: CardClass): Card {
  return {
    id: ref(_card.id),
    complete: () => _card.complete(),
    dismiss: () => _card.dismiss(),
    title: ref(_card.title),
    body: ref(_card.body),
    completeLabel: ref(_card.completeLabel),
    dismissLabel: ref(_card.dismissLabel),
    active: ref(_card.active),
    completed: ref(_card.completed),
    dismissed: ref(_card.dismissed),
  } satisfies Record<keyof SemanticCard, NonNullable<unknown>>;
}

/**
 * Returns the {@link Card} associated with this `id`.
 *
 * @example
 * ```js
 * const card = useCard("flow-one.my-card");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the card.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link Card} instance corresponding to the id.
 */
export function useCard(id: SemanticCard['id']): Card {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useCard` without using DoptPlugin');
  }

  const _card = dopt.card(id);
  const card: Card = createCard(_card);

  const unsubscribeCard = _card.subscribe(() => {
    updateCard(card, _card);
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeCard();
  });

  return card;
}
