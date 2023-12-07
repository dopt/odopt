import { example, heading, leftNav, rightNav } from '@/pages/index.css';

import {
  Alerts,
  Brand,
  Navigation,
  Settings,
  Table,
  User,
  Space,
} from '@/components';

import { useTheme } from '@/hooks';
import { useModal } from '@dopt/react-modal';
import RichTextField from '@dopt/react-rich-text';

import * as Dialog from '@radix-ui/react-dialog';
import { IconToggleRight } from '@tabler/icons';

export function Example() {
  const [_, setTheme] = useTheme('light');

  const modal = useModal('radix-dark-mode-toggle.dark-mode-announcement');

  console.log('modal.active', modal.active);

  return (
    <div className={example}>
      <div className={heading}>
        <div className={leftNav}>
          <Brand />
          <Navigation />
        </div>
        <div className={rightNav}>
          <Alerts />
          <Settings />
          <User />
        </div>
      </div>
      <Table />
      <Dialog.Root open={modal.active}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Space />
            <div>
              <Dialog.Title className="DialogTitle">{modal.title}</Dialog.Title>
              <Dialog.Description className="DialogDescription">
                <RichTextField>{modal.body}</RichTextField>
              </Dialog.Description>
              <div className="DialogButtons">
                <Dialog.Close asChild>
                  <button className="Button" onClick={() => modal.dismiss()}>
                    {modal.dismissLabel}
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button
                    className="Button"
                    onClick={() => {
                      setTheme('dark');
                      modal.complete();
                    }}
                  >
                    <IconToggleRight />
                    {modal.completeLabel}
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
