import { Card, Flex, Progress, Text } from '@chakra-ui/react';

import { IconArrowRight } from '@tabler/icons';

import { CHECKLIST } from '@/const';

import { useUnorderedGroup } from '@dopt/react-old';

export function ChecklistPreview() {
  const [checklist] = useUnorderedGroup(CHECKLIST);

  const numCompletedBlocks = checklist.getCompleted().length;

  return (
    <Card p="4" gap="2" bg="white" cursor="pointer">
      <Flex align="center">
        <Text pr="1">Getting started</Text>
        <IconArrowRight size={16} />
      </Flex>
      <Flex gap={2} align="center">
        <Progress
          borderRadius="8px"
          value={(numCompletedBlocks / checklist.blocks.length) * 100}
          style={{ flexGrow: 1 }}
        />
        <Text fontSize="sm">{`${numCompletedBlocks}/3`}</Text>
      </Flex>
    </Card>
  );
}
