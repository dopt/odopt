import { inject, onBeforeUnmount, ref, Ref } from 'vue';
import { DOPT_KEY } from './plugin-keys';
import { Modal as SemanticModal } from '@dopt/semantic-data-layer-modal';
import { Modal as ModalClass } from '@dopt/javascript';
import { Children } from '@dopt/core-rich-text';
import { createFieldGetter, Block, useInitializeFields } from './block';

/**
 * Modal generally follows the card interface
 * specified in @dopt/semantic-data-layer-modal.
 * However, it exposes `Ref`s where possible
 * to allow built-in reactivity.
 */
export interface Modal {
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
  /**
   * Use this to access custom fields on the modal.
   */
  field: Block['field'];
}

function updateModal(modal: Modal, _modal: ModalClass): void {
  modal.id.value = _modal.id;
  modal.title.value = _modal.title;
  modal.body.value = _modal.body;
  modal.completeLabel.value = _modal.completeLabel;
  modal.dismissLabel.value = _modal.dismissLabel;
  modal.active.value = _modal.active;
  modal.completed.value = _modal.completed;
  modal.dismissed.value = _modal.dismissed;
}

function createModal(_modal: ModalClass): Modal {
  return {
    id: ref(_modal.id),
    field: ref(createFieldGetter(_modal)),
    complete: () => _modal.complete(),
    dismiss: () => _modal.dismiss(),
    title: ref(_modal.title),
    body: ref(_modal.body),
    completeLabel: ref(_modal.completeLabel),
    dismissLabel: ref(_modal.dismissLabel),
    active: ref(_modal.active),
    completed: ref(_modal.completed),
    dismissed: ref(_modal.dismissed),
  } satisfies Record<keyof SemanticModal, NonNullable<unknown>>;
}

/**
 * Returns the {@link Modal} associated with this `id`.
 *
 * @example
 * ```js
 * const modal = useModal("flow-one.my-modal");
 * ```
 *
 * @param id one of {@link Block['uid']} | {@link Block['sid']} The id of the modal.
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns A {@link Modal} instance corresponding to the id.
 */
export function useModal(id: SemanticModal['id']): Modal {
  const dopt = inject(DOPT_KEY);

  if (!dopt) {
    throw new Error('Cannot call `useModal` without using DoptPlugin');
  }

  const _modal = dopt.modal(id);
  const modal: Modal = createModal(_modal);

  useInitializeFields(modal.field, _modal);

  const unsubscribeModal = _modal.subscribe(() => {
    updateModal(modal, _modal);
  });

  /**
   * Before unmount, we unsubscribe any subscriptions.
   */
  onBeforeUnmount(() => {
    unsubscribeModal();
  });

  return modal;
}
