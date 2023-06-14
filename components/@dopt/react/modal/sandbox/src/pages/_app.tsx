import { DoptProvider, useFlow } from '@dopt/react';

import { useModal } from '@dopt/react-modal';

import * as Modal from '@dopt/react-modal';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-9147ae6ee202b7fa09e22f5f77c91213b3df0220286083ed2c54c8453c0008ac_MTMz"
      flowVersions={{
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
  const modal = useModal('09PYM6xjW6uEAPLyGVy28');

  return (
    <Modal.Root active={modal.active}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.DismissIcon onClick={modal.dismiss} />
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

function ResetButton() {
  const [, methods] = useFlow('modal');
  return <button onClick={() => methods.reset()}>reset</button>;
}
