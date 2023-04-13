import { Block } from '@dopt/react';

import * as Icons from '@tabler/icons';

import { Accordion, Flex, useDisclosure } from '@chakra-ui/react';

import { CheckListItem } from './item';

import styles from './popover.module.css';

const getIcon = (iconName: string | null): Icons.TablerIcon => {
  return Icons[iconName as keyof typeof Icons] || Icons.IconFileUnknown;
};

export function ChecklistPopover({
  datasourceBlock,
  chartsBlock,
  shareBlock,
  datasourceModalProps,
  inviteModalProps,
  addChartsModalProps,
}: {
  datasourceBlock: Block<unknown>;
  chartsBlock: Block<unknown>;
  shareBlock: Block<unknown>;
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
        completed={datasourceBlock.state.exited}
        Icon={getIcon(datasourceBlock.field('panel-icon', ''))}
        title={datasourceBlock.field('panel-title', '')}
        panelText={datasourceBlock.field('panel-body', '')}
        buttonText={datasourceBlock.field('panel-button-text', '')}
        onClickButton={datasourceModalProps.onOpen}
      />
      <CheckListItem
        completed={chartsBlock.state.exited}
        Icon={getIcon(chartsBlock.field('panel-icon', ''))}
        title={chartsBlock.field('panel-title', '')}
        panelText={chartsBlock.field('panel-body', '')}
        buttonText={chartsBlock.field('panel-button-text', '')}
        onClickButton={addChartsModalProps.onOpen}
      />
      <CheckListItem
        completed={shareBlock.state.exited}
        Icon={getIcon(shareBlock.field('panel-icon', ''))}
        title={shareBlock.field('panel-title', '')}
        panelText={shareBlock.field('panel-body', '')}
        buttonText={shareBlock.field('panel-button-text', '')}
        onClickButton={inviteModalProps.onOpen}
      />
    </Accordion>
  );
}
