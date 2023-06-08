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
  const {
    title,
    body,
    dismissLabel,
    completeLabel,
    isOpen,
    dismiss,
    complete,
  } = useModal('09PYM6xjW6uEAPLyGVy28');

  if (!isOpen) {
    return null;
  }

  return (
    <Modal.Root>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.DismissIcon onClick={dismiss} />
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton onClick={dismiss}>
            {dismissLabel}
          </Modal.DismissButton>
          <Modal.CompleteButton onClick={complete}>
            {completeLabel}
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
