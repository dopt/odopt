import { useState } from 'react';

import { IconCheck } from '@tabler/icons';

import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';

export function ConnectDatasourceModal({
  onClose = () => undefined,
  isOpen = false,
  onFinish,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'> & {
  onFinish: () => void;
}) {
  const [selection, setSelection] = useState<
    'segment' | 'snowflake' | 'database' | undefined
  >(undefined);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setSelection(undefined);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect a datasource</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            <ListItem onClick={() => setSelection('segment')}>
              <Flex align="center">
                {selection === 'segment' ? (
                  <IconCheck size={18} />
                ) : (
                  <Box pr="18px" />
                )}
                <Text pl="2">Segment</Text>
              </Flex>
            </ListItem>
            <ListItem onClick={() => setSelection('snowflake')}>
              <Flex>
                {selection === 'snowflake' ? (
                  <IconCheck size={18} />
                ) : (
                  <Box pr="18px" />
                )}
                <Text pl="2">Snowflake</Text>
              </Flex>
            </ListItem>
            <ListItem onClick={() => setSelection('database')}>
              <Flex>
                {selection === 'database' ? (
                  <IconCheck size={18} />
                ) : (
                  <Box pr="18px" />
                )}
                <Text pl="2">Database</Text>
              </Flex>
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={() => {
              setSelection(undefined);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button isDisabled={!selection} onClick={onFinish}>
            Connect
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
