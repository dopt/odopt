import { IconArrowRight, IconCircleCheck } from '@tabler/icons';

import { useBlock } from '@dopt/react';

import {
  Box,
  Card,
  Flex,
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
  NEXT_STEPS,
} from '@/const';

import { ChartSelection } from '@/types';

import {
  ConnectDatasourceModal,
  InviteTeamMembersModal,
  AddChartsModal,
  NextStepsModal,
} from '@/components';

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

  const [datasourceBlock, datasourceTransition] =
    useBlock<['default']>(CONNECT_DATASOURCE);
  const [chartsBlock, chartsTransition] = useBlock<['default']>(ADD_CHARTS);
  const [shareBlock, shareTransition] = useBlock<['default']>(SHARE_DASHBOARD);
  const [nextStepsBlock] = useBlock(NEXT_STEPS);

  const isNextSteps = nextStepsBlock.state.active;
  const isChecklist =
    !isNextSteps &&
    (datasourceBlock.state.active ||
      chartsBlock.state.active ||
      shareBlock.state.active);

  if (isNextSteps) {
    return (
      <Card
        p={4}
        gap={2}
        bg="white"
        onClick={() => nextStepsModalProps.onOpen()}
        cursor="pointer"
      >
        <Flex align="center" gap={1}>
          <IconCircleCheck size={24} fill="gray" color="white" />
          <Text color="gray">Getting started</Text>
        </Flex>
        <Flex color="#228BE6" align="center" gap={1}>
          <Text>Next steps</Text>
          <IconArrowRight size={16} />
        </Flex>
        <NextStepsModal {...nextStepsModalProps} />
      </Card>
    );
  } else {
    return (
      <Flex direction="column" gap={2}>
        {isChecklist && (
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
        )}
        <ConnectDatasourceModal
          onClose={datasourceModalProps.onClose}
          isOpen={datasourceModalProps.isOpen}
          onFinish={() => {
            datasourceTransition('default');
            datasourceModalProps.onClose();
          }}
        />
        <AddChartsModal
          onClose={addChartsModalProps.onClose}
          isOpen={addChartsModalProps.isOpen}
          onFinish={(selection) => {
            setDashboardCharts(selection);
            if (
              Object.values(selection).filter((val) => val == true).length > 1
            ) {
              chartsTransition('default');
            }
            addChartsModalProps.onClose();
          }}
        />
        <InviteTeamMembersModal
          onClose={inviteModalProps.onClose}
          isOpen={inviteModalProps.isOpen}
          onFinish={() => {
            shareTransition('default');
            inviteModalProps.onClose();
          }}
        />
      </Flex>
    );
  }
}
