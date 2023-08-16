import Modal, { useModal } from '@dopt/react-modal';

import { DOPT_MODAL_ID } from '../../const';

export function ModalWrapper() {
  const modal = useModal(DOPT_MODAL_ID);

  return (
    <Modal.Root active={modal.active}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.body}</Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton onClick={modal.dismiss}>
            {modal.dismissLabel}
          </Modal.DismissButton>
          <Modal.CompleteButton onClick={modal.complete}>
            {modal.completeLabel}
          </Modal.CompleteButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
