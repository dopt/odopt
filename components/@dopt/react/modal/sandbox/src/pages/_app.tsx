import { DoptProvider, useFlow } from '@dopt/react';

import Modal, { useModal } from '@dopt/react-modal';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flows={{
        modal: 0,
      }}
    >
      <ModalComponent />
      <div>
        <ResetButton />
      </div>
    </DoptProvider>
  );
}

function ModalComponent() {
  const modal = useModal('modal.two-lions-wash');

  return (
    <Modal.Root active={modal.active}>
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
  );
}

function ResetButton() {
  const [, methods] = useFlow('modal');
  return <button onClick={() => methods.reset()}>reset</button>;
}
