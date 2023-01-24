import { useState } from 'react';

import { IconDatabase } from '@tabler/icons';

import {
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

interface Sources {
  segment: boolean;
  snowflake: boolean;
  database: boolean;
}

const initialSources: Sources = {
  segment: true,
  snowflake: false,
  database: false,
};

export function ConnectDatasourceModal({
  onClose = () => undefined,
  isOpen = false,
  onFinish,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'> & {
  onFinish: () => void;
}) {
  const [sources, setSources] = useState<Sources>(initialSources);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connect a data source</ModalHeader>
        <ModalBody>
          <List spacing={3} border="0.5px solid #DCDCDC">
            <ListItem borderBottom="0.5px solid #DCDCDC" p={3}>
              <Flex justify="space-between" align="center">
                <Flex gap={2}>
                  <img
                    src={`${import.meta.env.BASE_URL}data-sources/segment.png`}
                    width={24}
                    height={24}
                    alt="Segment"
                  />
                  <Text>Segment</Text>
                </Flex>
                {sources.segment ? (
                  <Text color="#A3A3A3" fontWeight="medium" p={2}>
                    Connected
                  </Text>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSources((prev) => ({
                        ...prev,
                        segment: true,
                      }))
                    }
                  >
                    Connect
                  </Button>
                )}
              </Flex>
            </ListItem>
            <ListItem
              borderBottom="0.5px solid #DCDCDC"
              p={3}
              style={{ marginTop: 0 }}
            >
              <Flex justify="space-between" align="center">
                <Flex gap={2}>
                  <img
                    src={`${
                      import.meta.env.BASE_URL
                    }data-sources/snowflake.png`}
                    width={24}
                    height={24}
                    alt="Snowflake"
                  />
                  <Text>Snowflake</Text>
                </Flex>
                {sources.snowflake ? (
                  <Text color="#A3A3A3" fontWeight="medium" p={2}>
                    Connected
                  </Text>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSources((prev) => ({
                        ...prev,
                        snowflake: true,
                      }))
                    }
                  >
                    Connect
                  </Button>
                )}
              </Flex>
            </ListItem>
            <ListItem style={{ marginTop: 0 }} p={3}>
              <Flex justify="space-between" align="center">
                <Flex gap={2}>
                  <IconDatabase size={24} />
                  <Text>Database</Text>
                </Flex>
                {sources.database ? (
                  <Text color="#A3A3A3" fontWeight="medium" p={2}>
                    Connected
                  </Text>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSources((prev) => ({
                        ...prev,
                        database: true,
                      }))
                    }
                  >
                    Connect
                  </Button>
                )}
              </Flex>
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button
              colorScheme="blue"
              // isDisabled={!selection}
              onClick={onFinish}
            >
              Done
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
