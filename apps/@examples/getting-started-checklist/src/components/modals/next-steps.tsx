import { useBlock } from '@dopt/react-old';

import {
  Button,
  Flex,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  UseDisclosureProps,
} from '@chakra-ui/react';

import { NEXT_STEPS } from '@/const';

export function NextStepsModal({
  onClose = () => undefined,
  isOpen = false,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'>) {
  const [{ getField }, { complete }] = useBlock(NEXT_STEPS);
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{getField('next-steps-title', '')}</ModalHeader>
        <ModalBody>
          <Flex direction="column" gap={4}>
            <Text>{getField('next-steps-analysis-callout', '')}</Text>
            <Text>You can learn how to:</Text>
            <UnorderedList>
              <ListItem>
                <Link textDecoration="underline">
                  {getField('next-steps-li-1', '')}
                </Link>
              </ListItem>
              <ListItem>
                <Link textDecoration="underline">
                  {getField('next-steps-li-2', '')}
                </Link>
              </ListItem>
              <ListItem>
                <Link textDecoration="underline">
                  {getField('next-steps-li-3', '')}
                </Link>
              </ListItem>
            </UnorderedList>
            <Text>📈 Happy analyzing!</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={complete}>
            {getField('next-steps-button-text', '')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
