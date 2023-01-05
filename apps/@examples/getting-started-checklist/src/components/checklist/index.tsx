import { useEffect } from 'react';
import {
  IconArrowRight,
  IconCircleCheck,
  IconPlugConnected,
  IconChartPie,
  IconShare,
} from '@tabler/icons';

import { useBlock } from '@dopt/react';

import {
  Accordion,
  Box,
  Card,
  Flex,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import {
  CONNECT_DATASOURCE,
  ADD_CHARTS,
  SHARE_DASHBOARD,
  GUARD,
  NEXT_STEPS,
} from '@/const';

import { ChartSelection } from '@/types';

import {
  ConnectDatasourceModal,
  InviteTeamMembersModal,
  AddChartsModal,
  NextStepsModal,
} from '@/components';

import { CheckListItem } from './item';
import { ChecklistPreview } from './preview';
import { ChecklistPopover } from './popover';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
  setDashboardCharts: (dashboardCharts: ChartSelection) => void;
}

export function GettingStartedChecklist({
  datasourceModalProps,
  inviteModalProps,
  addChartsModalProps,
  setDashboardCharts,
}: Props) {
  const nextStepsModalProps = useDisclosure();

  const [datasourceBlock, datasorceMethods] = useBlock(CONNECT_DATASOURCE);
  const [chartsBlock, chartsMethods] = useBlock(ADD_CHARTS);
  const [shareBlock, shareMethods] = useBlock(SHARE_DASHBOARD);
  const [guardBlock, { complete: completeGuardBlock }] = useBlock(GUARD);
  const [nextStepsBlock] = useBlock(NEXT_STEPS);

  useEffect(() => {
    if (
      guardBlock.state.active &&
      datasourceBlock.state.completed &&
      shareBlock.state.completed &&
      chartsBlock.state.completed
    ) {
      setTimeout(() => {
        completeGuardBlock();
      }, 100);
    }
  }, [guardBlock, datasourceBlock, shareBlock, chartsBlock]);

  if (
    datasourceBlock.state.active ||
    chartsBlock.state.active ||
    shareBlock.state.active
  ) {
    return (
      <Flex direction="column" gap="2">
        <Popover placement="top-start">
          <PopoverTrigger>
            <Box>
              <ChecklistPreview />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <ChecklistPopover
              datasourceBlock={datasourceBlock}
              chartsBlock={chartsBlock}
              shareBlock={shareBlock}
              datasourceModalProps={datasourceModalProps}
              inviteModalProps={inviteModalProps}
              addChartsModalProps={addChartsModalProps}
            />
          </PopoverContent>
        </Popover>
        <ConnectDatasourceModal
          onClose={datasourceModalProps.onClose}
          isOpen={datasourceModalProps.isOpen}
          onFinish={() => {
            datasorceMethods.complete();
            datasourceModalProps.onClose();
          }}
        />
        <AddChartsModal
          onClose={addChartsModalProps.onClose}
          isOpen={addChartsModalProps.isOpen}
          onFinish={(selection) => {
            setDashboardCharts(selection);
            chartsMethods.complete();
            addChartsModalProps.onClose();
          }}
        />
        <InviteTeamMembersModal
          onClose={inviteModalProps.onClose}
          isOpen={inviteModalProps.isOpen}
          onFinish={() => {
            shareMethods.complete();
            inviteModalProps.onClose();
          }}
        />
      </Flex>
    );
  } else if (nextStepsBlock.state.active) {
    return (
      <Card p="4" gap="2" bg="white">
        <Flex align="center">
          <Box pr="1" opacity={0.75}>
            <IconCircleCheck size={24} fill="gray" color="white" />
          </Box>
          <Box as="span" flex="1" textAlign="left" opacity={0.75}>
            <Text>Getting started</Text>{' '}
          </Box>
        </Flex>
        <Flex color="#7047EB" align="center">
          <Link onClick={() => nextStepsModalProps.onOpen()}>
            <Text pr="1">Next steps</Text>
          </Link>
          <IconArrowRight size={16} />
        </Flex>
        <NextStepsModal {...nextStepsModalProps} />
      </Card>
    );
  } else {
    return null;
  }
}
