import { SetStateAction, useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Select,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from '@chakra-ui/react';

export function InviteTeamMembersModal({
  onClose = () => undefined,
  isOpen = false,
  onFinish,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'> & {
  onFinish: () => void;
}) {
  const [selection, setSelection] = useState<
    'erica' | 'jessica' | 'steve' | undefined
  >(undefined);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite team members</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            onChange={(e) =>
              setSelection(
                e.target.value as SetStateAction<
                  'erica' | 'jessica' | 'steve' | undefined
                >
              )
            }
            placeholder="Select option"
          >
            <option value="option1">erica@acme.com</option>
            <option value="option2">jessica@acme.com</option>
            <option value="option3">steve@acme.com</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="white"
            color="#061533"
            border="1px solid #DADADA"
            borderRadius="8px"
            fontWeight="medium"
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            bg="#4313AA"
            color="white"
            borderRadius="8px"
            fontWeight="medium"
            isDisabled={!selection}
            onClick={() => onFinish()}
          >
            Share
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
