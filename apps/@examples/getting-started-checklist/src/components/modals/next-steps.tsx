import { useBlock } from '@dopt/react';

import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  Flex,
  Link,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';

import { NEXT_STEPS } from '@/const';

export function NextStepsModal({
  onClose = () => undefined,
  isOpen = false,
}: Pick<UseDisclosureProps, 'isOpen' | 'onClose'>) {
  const [, { complete }] = useBlock(NEXT_STEPS);
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Next Steps</ModalHeader>
        <ModalBody>
          <Flex direction="column" gap={4}>
            <Text>You’re ready to take your analysis to the next level!</Text>
            <Text>You can learn how to:</Text>
            <UnorderedList>
              <ListItem>
                <Link textDecoration="underline">
                  Compare active users across time ranges
                </Link>
              </ListItem>
              <ListItem>
                <Link textDecoration="underline">
                  Analyze usage at the company level
                </Link>
              </ListItem>
              <ListItem>
                <Link textDecoration="underline">Add more data sources</Link>
              </ListItem>
            </UnorderedList>
            <Text>📈 Happy analyzing!</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={complete}>
            Finish getting started
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
