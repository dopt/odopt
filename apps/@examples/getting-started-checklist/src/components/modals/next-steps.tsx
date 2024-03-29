import { useBlock } from '@dopt/react';

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
  const [{ field }, transition] = useBlock<['complete']>(NEXT_STEPS);
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{field<string>('next-steps-title')}</ModalHeader>
        <ModalBody>
          <Flex direction="column" gap={4}>
            <Text>{field<string>('next-steps-analysis-callout')}</Text>
            <Text>You can learn how to:</Text>
            <UnorderedList>
              <ListItem>
                <Link textDecoration="underline">
                  {field<string>('next-steps-li-1')}
                </Link>
              </ListItem>
              <ListItem>
                <Link textDecoration="underline">
                  {field<string>('next-steps-li-2')}
                </Link>
              </ListItem>
              <ListItem>
                <Link textDecoration="underline">
                  {field<string>('next-steps-li-3')}
                </Link>
              </ListItem>
            </UnorderedList>
            <Text>📈 Happy analyzing!</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={() => transition('complete')}>
            {field<string>('next-steps-button-text')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
