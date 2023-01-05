import { IconDatabaseExport, IconLayoutDashboard } from '@tabler/icons';
import { Flex, Link, Text, useDisclosure } from '@chakra-ui/react';

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
    <Flex direction="column" justify="space-between" color="#061533">
      <Flex direction="column">
        <Flex gap="2">
          <IconLayoutDashboard width={24} height={24} />
          <Text pb="3">Dashboards</Text>
        </Flex>
        <Text color="#4313AA">Active Users</Text>
      </Flex>
      <Flex direction="column">
        <Link onClick={() => props.datasourceModalProps.onOpen()}>
          <Flex gap="2">
            <IconDatabaseExport width={24} height={24} />
            <Text pb="3">Data sources</Text>
          </Flex>
        </Link>
        <GettingStartedChecklist {...props} />
      </Flex>
    </Flex>
  );
}
