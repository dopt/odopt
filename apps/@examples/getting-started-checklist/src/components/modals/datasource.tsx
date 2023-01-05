import { useState } from 'react';

import { IconCheck, IconDatabase } from '@tabler/icons';

import {
  Box,
  Button,
  Divider,
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
    'snowflake' | 'database' | undefined
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
          <List spacing={3} border="0.5px solid #DCDCDC">
            <ListItem borderBottom="0.5px solid #DCDCDC" p="3">
              <Flex justify="space-between" align="center">
                <Flex>
                  <IconDatabase size={24} />
                  <Text pl="2">Segment</Text>
                </Flex>
                <Text color="#A3A3A3" fontWeight="medium" p="2">
                  Connected
                </Text>
              </Flex>
            </ListItem>
            <ListItem
              borderBottom="0.5px solid #DCDCDC"
              onClick={() => setSelection('snowflake')}
              p="3"
              style={{ marginTop: 0 }}
            >
              <Flex justify="space-between" align="center">
                <Flex>
                  <IconDatabase size={24} />
                  <Text pl="2">Snowflake</Text>
                </Flex>
                {selection === 'snowflake' ? (
                  <Text color="#A3A3A3" fontWeight="medium" p="2">
                    Connected
                  </Text>
                ) : (
                  <Button
                    bg="white"
                    color="#061533"
                    border="1px solid #DADADA"
                    borderRadius="8px"
                    fontWeight="medium"
                  >
                    Connect
                  </Button>
                )}
              </Flex>
            </ListItem>
            <ListItem
              style={{ marginTop: 0 }}
              onClick={() => setSelection('database')}
              p="3"
            >
              <Flex justify="space-between" align="center">
                <Flex>
                  <IconDatabase size={24} />
                  <Text pl="2">Database</Text>
                </Flex>
                {selection === 'database' ? (
                  <Text color="#A3A3A3" fontWeight="medium" p="2">
                    Connected
                  </Text>
                ) : (
                  <Button
                    bg="white"
                    color="#061533"
                    border="1px solid #DADADA"
                    borderRadius="8px"
                    fontWeight="medium"
                  >
                    Connect
                  </Button>
                )}
              </Flex>
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="white"
            color="#061533"
            border="1px solid #DADADA"
            borderRadius="8px"
            fontWeight="medium"
            mr={3}
            onClick={() => {
              setSelection(undefined);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            bg="#4313AA"
            color="white"
            borderRadius="8px"
            fontWeight="medium"
            isDisabled={!selection}
            onClick={onFinish}
          >
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
