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
    <Flex
      direction="column"
      justify="space-between"
      color="#061533"
      style={{ width: '100%' }}
    >
      <Flex direction="column" gap={4}>
        <Flex gap={2}>
          <IconLayoutDashboard width={24} height={24} />
          <Text>Dashboards</Text>
        </Flex>
        <Text color="#228BE6">Active users</Text>
      </Flex>
      <Flex direction="column" gap={4}>
        <Link onClick={() => props.datasourceModalProps.onOpen()}>
          <Flex gap={2}>
            <IconDatabaseExport width={24} height={24} />
            <Text>Data sources</Text>
          </Flex>
        </Link>
        <GettingStartedChecklist {...props} />
      </Flex>
    </Flex>
  );
}
