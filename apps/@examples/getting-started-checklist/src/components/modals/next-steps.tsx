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
          <Text pb="2">
            You’re ready to take your analysis to the next level!
          </Text>
          <Text>You can learn how to:</Text>
          <UnorderedList>
            <ListItem>Compare active users across time ranges</ListItem>
            <ListItem>Analyze usage at the company level</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Add more data sources</ListItem>
          </UnorderedList>
          <Text>📈 Happy analyzing!</Text>
        </ModalBody>
        <ModalFooter>
          <Button bg="#7047EB" color="white" onClick={() => complete()}>
            Finish getting started
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
