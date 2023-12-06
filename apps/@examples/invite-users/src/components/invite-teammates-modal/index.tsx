import { IconPlus } from '@tabler/icons';
import { inviteUsers } from './index.css';

import { createTheme } from '@dopt/react-theme';
import Modal from '@dopt/react-modal';
import { PropsWithChildren, useState } from 'react';
import { InviteUsersForm } from '../invite-teammates-form';
import { useChecklistItem } from '@dopt/react-checklist';

const theme = createTheme({
  colors: {
    primary: '#339AF0',
  },
});

export function InviteUsers() {
  const checklistItem = useChecklistItem('invite-users.invite-teammates');

  const [inviteUserModalOpen, setInviteUsersModalOpen] =
    useState<boolean>(false);

  const [, setEmails] = useState<string[]>([]);

  return (
    <div className={inviteUsers} onClick={() => setInviteUsersModalOpen(true)}>
      <IconPlus />
      Invite teammates
      <InviteUsersModal
        open={inviteUserModalOpen}
        dismiss={() => setInviteUsersModalOpen(false)}
        submit={() => {
          checklistItem.complete();
          setInviteUsersModalOpen(false);
        }}
      >
        <InviteUsersForm
          onChange={(emails) => {
            setEmails(emails.split(',').filter((e) => e));
          }}
        />
      </InviteUsersModal>
    </div>
  );
}

interface Props extends PropsWithChildren {
  open: boolean;
  submit: () => void;
  dismiss: () => void;
}

export function InviteUsersModal(props: Props) {
  return (
    <Modal.Root active={props.open} theme={theme}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Invite teammates</Modal.Title>
          <Modal.DismissIcon
            onClick={(e) => {
              e.stopPropagation();
              props.dismiss();
            }}
          />
        </Modal.Header>

        <div>
          Collaborate with your team by inviting them to your SomeCMS workspace.
        </div>
        <div>{props.children}</div>
        <Modal.Footer>
          <Modal.DismissButton
            onClick={(e) => {
              e.stopPropagation();
              props.dismiss();
            }}
          >
            Cancel
          </Modal.DismissButton>
          <Modal.CompleteButton
            onClick={(e) => {
              e.stopPropagation();
              props.submit();
            }}
          >
            Send invites
          </Modal.CompleteButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
}
