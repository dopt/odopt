import { Header, Layout, Main, Navigation } from '@/components';
import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import { ChartSelection } from '@/types';

export function GettingStartedChecklistExample() {
  const [dashboardCharts, setDashboardCharts] = useState<ChartSelection>({
    dailyActiveUsers: true,
    newActiveUsers: false,
    montlyActiveUsers: false,
    mostActiveUsers: false,
    activeToday: false,
  });

  const datasourceModalProps = useDisclosure();
  const inviteModalProps = useDisclosure();
  const addChartsModalProps = useDisclosure();

  return (
    <Layout
      navigation={
        <Navigation
          datasourceModalProps={datasourceModalProps}
          inviteModalProps={inviteModalProps}
          addChartsModalProps={addChartsModalProps}
          setDashboardCharts={(dashboardCharts: ChartSelection) => {
            setDashboardCharts((prev) =>
              Object.assign({
                ...prev,
                ...dashboardCharts,
              })
            );
          }}
        />
      }
      header={
        <Header
          datasourceModalProps={datasourceModalProps}
          inviteModalProps={inviteModalProps}
          addChartsModalProps={addChartsModalProps}
        />
      }
      main={
        <Main
          datasourceModalProps={datasourceModalProps}
          inviteModalProps={inviteModalProps}
          addChartsModalProps={addChartsModalProps}
          dashboardCharts={dashboardCharts}
        />
      }
    />
  );
}
