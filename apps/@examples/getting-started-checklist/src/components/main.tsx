import { Flex, useDisclosure } from '@chakra-ui/react';

import {
  ActiveToday,
  DailyActiveUsers,
  MonthlyActiveUsers,
  MostActiveUsers,
  NewActiveUsers,
} from '@/charts';

import { ChartSelection } from '@/types';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
  dashboardCharts: ChartSelection;
}

export function Main(props: Props) {
  return (
    <Flex wrap="wrap" gap={4}>
      <DailyActiveUsers />
      {props.dashboardCharts.activeToday && <ActiveToday />}
      {props.dashboardCharts.monthlyActiveUsers && <MonthlyActiveUsers />}
      {props.dashboardCharts.mostActiveUsers && <MostActiveUsers />}
      {props.dashboardCharts.newActiveUsers && <NewActiveUsers />}
    </Flex>
  );
}
