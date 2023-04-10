import { useBlock } from '@dopt/react-old';

import { example } from '@/pages/index.css';
import { Skeleton, Modal, Button } from '@/components';

export function Example() {
  const [modal, methods] = useBlock('3Q3wx6Zlki3ZbmBhPSgum');

  return (
    <div className={example}>
      <Skeleton />
      <Modal open={modal.state.active}>
        <div>
          This is a modal that can do anything from feature announcements to
          upsells.
        </div>
        <Button color="pink" onClick={methods.complete}>
          Got it
        </Button>
      </Modal>
    </div>
  );
}
