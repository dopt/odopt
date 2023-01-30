import { useState } from 'react';

import {
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from '@chakra-ui/react';

import styles from './invite.module.css';

interface Member {
  name: string;
  email: string;
  avatarBg: string;
}

const members: Member[] = [
  { name: 'erica', email: 'erica@acme.com', avatarBg: '#E2DAFB' },
  { name: 'jessica', email: 'jessica@acme.com', avatarBg: '#FFE7AB' },
  { name: 'steve', email: 'steve@acme.com', avatarBg: '#F5B5A1' },
];

export function InviteTeamMembersModal({
  onClose = () => undefined,
  isOpen = false,
  onFinish,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'> & {
  onFinish: () => void;
}) {
  const [selection, setSelection] = useState<number | undefined>(undefined);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite team members</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={2}>
            Team members
            <Menu matchWidth>
              <MenuButton className={styles.input}>
                {selection !== undefined && (
                  <MemberItem member={members[selection]} />
                )}
              </MenuButton>
              <MenuList>
                {members.map((member, index) => (
                  <MenuItem key={index} onClick={() => setSelection(index)}>
                    <MemberItem member={member} />
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button
              variant="outline"
              onClick={() => {
                setSelection(undefined);
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              isDisabled={selection === undefined}
              onClick={() => {
                setSelection(undefined);
                onFinish();
              }}
            >
              Share
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function MemberItem({ member }: { member: Member }) {
  return (
    <Flex gap={2}>
      <Box bg={member.avatarBg} borderRadius="full">
        <img
          src={`${import.meta.env.BASE_URL}avatars/${member.name}.png`}
          width={24}
          height={24}
          alt={member.name}
        />
      </Box>
      {member.email}
    </Flex>
  );
}
