import { IconLayoutDashboard } from '@tabler/icons';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';

import { GettingStartedChecklist } from '@/components';
import { ChartSelection } from '@/types';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
  setDashboardCharts: (dashboardCharts: ChartSelection) => void;
}

export function Navigation(props: Props) {
  return (
    <Flex direction="column" justify="space-between">
      <Flex direction="column">
        <Text pb="3">Dashboards</Text>
        <Flex>
          <IconLayoutDashboard width={24} height={24} />
          <Text pl="2">Active Users</Text>
        </Flex>
      </Flex>
      <Flex>
        <GettingStartedChecklist {...props} />
      </Flex>
    </Flex>
  );
}
