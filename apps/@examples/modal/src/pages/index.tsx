import { useBlock } from '@dopt/react';

import { example } from '@/pages/index.css';
import { Skeleton, Modal, Button } from '@/components';

export function Example() {
  const [modal, transition] = useBlock<['default']>('modal.modal');

  return (
    <div className={example}>
      <Skeleton />
      <Modal open={modal.state.active}>
        <div>
          This is a modal that can do anything from feature announcements to
          upsells.
        </div>
        <Button color="pink" onClick={() => transition('default')}>
          Got it
        </Button>
      </Modal>
    </div>
  );
}
