import { BlockWithGetField } from '@dopt/react-old';

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
  datasourceBlock: BlockWithGetField;
  chartsBlock: BlockWithGetField;
  shareBlock: BlockWithGetField;
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
        Icon={getIcon(datasourceBlock.getField('panel-icon', ''))}
        title={datasourceBlock.getField('panel-title', '')}
        panelText={datasourceBlock.getField('panel-body', '')}
        buttonText={datasourceBlock.getField('panel-button-text', '')}
        onClickButton={datasourceModalProps.onOpen}
      />
      <CheckListItem
        completed={chartsBlock.state.completed}
        Icon={getIcon(chartsBlock.getField('panel-icon', ''))}
        title={chartsBlock.getField('panel-title', '')}
        panelText={chartsBlock.getField('panel-body', '')}
        buttonText={chartsBlock.getField('panel-button-text', '')}
        onClickButton={addChartsModalProps.onOpen}
      />
      <CheckListItem
        completed={shareBlock.state.completed}
        Icon={getIcon(shareBlock.getField('panel-icon', ''))}
        title={shareBlock.getField('panel-title', '')}
        panelText={shareBlock.getField('panel-body', '')}
        buttonText={shareBlock.getField('panel-button-text', '')}
        onClickButton={inviteModalProps.onOpen}
      />
    </Accordion>
  );
}
