import { Button, Modal, Skeleton } from '@/components';
import { useModal } from '@dopt/react-modal';
import { RichText } from '@dopt/react-rich-text';

import './index.css';

export function Home() {
  // Access the modal data from the modal block in the flow
  const modal = useModal('custom-modal-component.tender-showers-smell');

  return (
    <div className="home">
      <Modal title={modal.title} open={modal.active}>
        {modal.body && <RichText>{modal.body}</RichText>}
        <Button onClick={modal.dismiss}>{modal.completeLabel}</Button>
      </Modal>

      <Skeleton />
    </div>
  );
}
