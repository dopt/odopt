import { Card, Flex, Progress, Text } from '@chakra-ui/react';

import { IconArrowRight } from '@tabler/icons';
import { SHARE_DASHBOARD, ADD_CHARTS, CONNECT_DATASOURCE } from '@/const';

import { useBlock } from '@dopt/react';

export function ChecklistPreview() {
  const [shareDashboard] = useBlock(SHARE_DASHBOARD);
  const [addCharts] = useBlock(ADD_CHARTS);
  const [connectDatasource] = useBlock(CONNECT_DATASOURCE);

  const numCompleted =
    (shareDashboard.state.exited ? 1 : 0) +
    (addCharts.state.exited ? 1 : 0) +
    (connectDatasource.state.exited ? 1 : 0);

  return (
    <Card p="4" gap="2" bg="white" cursor="pointer">
      <Flex align="center">
        <Text pr="1">Getting started</Text>
        <IconArrowRight size={16} />
      </Flex>
      <Flex gap={2} align="center">
        <Progress
          borderRadius="8px"
          value={Math.floor((numCompleted / 3) * 100)}
          style={{ flexGrow: 1 }}
        />
        <Text fontSize="sm">{`${numCompleted}/3`}</Text>
      </Flex>
    </Card>
  );
}
