import { Skeleton } from '@/components';
import Modal, { useModal } from '@dopt/react-modal';

import './index.css';

export function Home() {
  // Access the modal data from the modal block in the flow
  const modal = useModal('modal-component.heavy-teeth-ask');

  return (
    <div className="home">
      <Modal.Root active={modal.active} className="welcome-modal">
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>{modal.title}</Modal.Title>
            <Modal.DismissIcon onClick={modal.dismiss} />
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

      <Skeleton />
    </div>
  );
}
