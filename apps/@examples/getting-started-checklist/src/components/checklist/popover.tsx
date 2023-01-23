import { Block } from '@dopt/react';

import { IconPlugConnected, IconChartPie, IconShare } from '@tabler/icons';

import { Accordion, Flex, useDisclosure } from '@chakra-ui/react';

import { CheckListItem } from './item';

import styles from './popover.module.css';

export function ChecklistPopover({
  datasourceBlock,
  chartsBlock,
  shareBlock,
  datasourceModalProps,
  inviteModalProps,
  addChartsModalProps,
}: {
  datasourceBlock: Block;
  chartsBlock: Block;
  shareBlock: Block;
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
}) {
  return (
    <Accordion>
      <Flex className={styles.checklistPopoverHeader} p={4}>
        Getting Started
      </Flex>
      <CheckListItem
        completed={datasourceBlock.state.completed}
        Icon={IconPlugConnected}
        title="Connect a data source"
        panelText="Connect a data source so you can start analyzing your active users."
        buttonText="Connect a data source"
        onClickButton={datasourceModalProps.onOpen}
      />
      <CheckListItem
        completed={chartsBlock.state.completed}
        Icon={IconChartPie}
        title="Add 3 charts"
        panelText="Add charts to your dashboard to see different views and insights about your active users."
        buttonText="Add a chart"
        onClickButton={addChartsModalProps.onOpen}
      />
      <CheckListItem
        completed={shareBlock.state.completed}
        Icon={IconShare}
        title="Share your dasboard"
        panelText="Share your dashboard with your teammates so they can view and analyze your active users."
        buttonText="Share dashboard"
        onClickButton={inviteModalProps.onOpen}
      />
    </Accordion>
  );
}
