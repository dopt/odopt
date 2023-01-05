import { Card, Flex, Text, Button, useDisclosure } from '@chakra-ui/react';

import { useBlock } from '@dopt/react';

import {
  ActiveToday,
  DailyActiveUsers,
  MontlyActiveUsers,
  MostActiveUsers,
  NewActiveUsers,
} from '@/charts';

import { CONNECT_DATASOURCE } from '@/const';
import { ChartSelection } from '@/types';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
  dashboardCharts: ChartSelection;
}

export function Main(props: Props) {
  const [datasourceBlock] = useBlock(CONNECT_DATASOURCE);
  if (!datasourceBlock.state.completed) {
    return (
      <Flex direction="column" align="center" justify="center" grow="1">
        <Button onClick={() => props.datasourceModalProps.onOpen()}>
          Connect a data source
        </Button>
        <Text>to start analyzing your active users</Text>
      </Flex>
    );
  }

  if (Object.values(props.dashboardCharts).filter((v) => v).length > 1) {
    return (
      <Flex wrap="wrap">
        <DailyActiveUsers />
        {props.dashboardCharts.activeToday && <ActiveToday />}
        {props.dashboardCharts.montlyActiveUsers && <MontlyActiveUsers />}
        {props.dashboardCharts.mostActiveUsers && <MostActiveUsers />}
        {props.dashboardCharts.newActiveUsers && <NewActiveUsers />}
      </Flex>
    );
  }

  return (
    <Flex align="start">
      <Card variant="unstyled">
        <DailyActiveUsers />
      </Card>
    </Flex>
  );
}
