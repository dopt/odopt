import {
  Button,
  Card,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from '@chakra-ui/react';

import {
  ActiveToday,
  MontlyActiveUsers,
  MostActiveUsers,
  NewActiveUsers,
} from '@/charts';
import { useState } from 'react';

import { ChartSelection } from '@/types';

export function AddChartsModal({
  onClose = () => undefined,
  isOpen = false,
  onFinish,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'> & {
  onFinish: (selection: ChartSelection) => void;
}) {
  const [selection, setSelection] = useState<ChartSelection>({
    dailyActiveUsers: false,
    newActiveUsers: false,
    montlyActiveUsers: false,
    mostActiveUsers: false,
    activeToday: false,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add chart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap="2" pb="2" justify="center">
            <Card
              variant="unstyled"
              onClick={() => {
                setSelection((prev) => {
                  return {
                    ...prev,
                    newActiveUsers: !prev.newActiveUsers,
                  };
                });
              }}
              border={
                selection.newActiveUsers
                  ? '2px solid #18A0FB'
                  : '2px solid transparent'
              }
            >
              <NewActiveUsers />
            </Card>
            <Card
              variant="unstyled"
              onClick={() => {
                setSelection((prev) => {
                  return {
                    ...prev,
                    mostActiveUsers: !prev.mostActiveUsers,
                  };
                });
              }}
              border={
                selection.mostActiveUsers
                  ? '2px solid #18A0FB'
                  : '2px solid transparent'
              }
            >
              <MostActiveUsers />
            </Card>
          </Flex>
          <Flex gap="2" justify="center">
            <Card
              variant="unstyled"
              onClick={() => {
                setSelection((prev) => {
                  return {
                    ...prev,
                    activeToday: !prev.activeToday,
                  };
                });
              }}
              border={
                selection.activeToday
                  ? '2px solid #18A0FB'
                  : '2px solid transparent'
              }
            >
              <ActiveToday />
            </Card>
            <Card
              variant="unstyled"
              onClick={() => {
                setSelection((prev) => {
                  return {
                    ...prev,
                    montlyActiveUsers: !prev.montlyActiveUsers,
                  };
                });
              }}
              border={
                selection.montlyActiveUsers
                  ? '2px solid #18A0FB'
                  : '2px solid transparent'
              }
            >
              <MontlyActiveUsers />
            </Card>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>{' '}
          <Button
            isDisabled={
              Object.values(selection).filter((selected) => selected).length ===
              0
            }
            onClick={() => onFinish(selection)}
          >
            {Object.values(selection).filter((selected) => selected).length > 1
              ? 'Add charts'
              : 'Add chart '}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
