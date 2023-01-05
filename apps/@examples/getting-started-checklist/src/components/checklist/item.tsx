import { IconCircleCheck, TablerIcon } from '@tabler/icons';

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';

interface CheckListItemProps {
  completed: boolean;
  Icon: TablerIcon;
  title: React.ReactNode;
  panelText: React.ReactNode;
  buttonText: React.ReactNode;
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
          <Box pr="1">{<Icon size={18} />}</Box>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack>
          <Text>{panelText}</Text>
          <Button bg="#4313AA" color="white" onClick={onClickButton}>
            {buttonText}
          </Button>
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
}

function FinishedCheckListItem({ title }: { title: React.ReactNode }) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box pr="1">
            <IconCircleCheck size={24} fill="#7047EB" color="white" />
          </Box>
          <Box as="span" flex="1" textAlign="left" opacity={0.75}>
            <Text>{title}</Text>
          </Box>
        </AccordionButton>
      </h2>
    </AccordionItem>
  );
}
