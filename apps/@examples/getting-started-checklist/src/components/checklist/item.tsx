import { type ReactNode } from 'react';
import { IconCheck, TablerIcon } from '@tabler/icons';

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';

interface CheckListItemProps {
  completed: boolean;
  Icon: TablerIcon;
  title: ReactNode;
  panelText: ReactNode;
  buttonText: ReactNode;
  onClickButton: () => void;
}

export function CheckListItem({
  Icon,
  buttonText,
  completed,
  onClickButton,
  panelText,
  title,
}: CheckListItemProps) {
  if (completed) {
    return <FinishedCheckListItem title={title} />;
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex gap={2} align="center" flexGrow={1}>
            <Box p={1} border="2px" borderRadius="full">
              <Icon size={18} />
            </Box>
            <Text fontWeight="bold">{title}</Text>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <Flex direction="column" gap={4}>
          <Text fontWeight="normal">{panelText}</Text>
          <Button colorScheme="blue" onClick={onClickButton}>
            {buttonText}
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  );
}

function FinishedCheckListItem({ title }: { title: ReactNode }) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex gap={2} align="center" flexGrow={1}>
            <Box
              p={1}
              border="2px"
              borderColor="#228BE6"
              borderRadius="full"
              bg="#228BE6"
            >
              <IconCheck size={18} color="white" />
            </Box>
            <Text fontWeight="bold" color="gray">
              {title}
            </Text>
          </Flex>
        </AccordionButton>
      </h2>
    </AccordionItem>
  );
}
