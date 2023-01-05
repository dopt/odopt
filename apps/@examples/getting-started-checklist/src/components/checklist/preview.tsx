import { Card, Flex, Link, Progress, Text } from '@chakra-ui/react';

import { IconArrowRight } from '@tabler/icons';

import { CONNECT_DATASOURCE, ADD_CHARTS, SHARE_DASHBOARD } from '@/const';

import { useBlock } from '@dopt/react';

export function ChecklistPreview() {
  const [datasource] = useBlock(CONNECT_DATASOURCE);
  const [charts] = useBlock(ADD_CHARTS);
  const [share] = useBlock(SHARE_DASHBOARD);

  const numberComplete = [datasource, charts, share].filter(
    (block) => block.state.completed
  ).length;

  const value = (numberComplete / 3) * 100;

  return (
    <Card p="4" gap="2" bg="white">
      <Flex align="center">
        <Link>
          <Text pr="1">Getting started</Text>
        </Link>
        <IconArrowRight size={16} />
      </Flex>
      <div>
        <Progress colorScheme="purple" borderRadius="8px" value={value} />
        {`${numberComplete} / 3`}
      </div>
    </Card>
  );
}
