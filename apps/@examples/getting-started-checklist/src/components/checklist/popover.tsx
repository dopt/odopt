import { Block } from '@dopt/react';

import * as Icons from '@tabler/icons';

import { Accordion, Flex, useDisclosure } from '@chakra-ui/react';

import { CheckListItem } from './item';

import styles from './popover.module.css';

const getIcon = (iconName: string | null | undefined): Icons.TablerIcon => {
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
        completed={datasourceBlock.state.exited}
        Icon={getIcon(datasourceBlock.field<string>('panel-icon'))}
        title={datasourceBlock.field<string>('panel-title')}
        panelText={datasourceBlock.field<string>('panel-body')}
        buttonText={datasourceBlock.field<string>('panel-button-text')}
        onClickButton={datasourceModalProps.onOpen}
      />
      <CheckListItem
        completed={chartsBlock.state.exited}
        Icon={getIcon(chartsBlock.field<string>('panel-icon'))}
        title={chartsBlock.field<string>('panel-title')}
        panelText={chartsBlock.field<string>('panel-body')}
        buttonText={chartsBlock.field<string>('panel-button-text')}
        onClickButton={addChartsModalProps.onOpen}
      />
      <CheckListItem
        completed={shareBlock.state.exited}
        Icon={getIcon(shareBlock.field<string>('panel-icon'))}
        title={shareBlock.field<string>('panel-title')}
        panelText={shareBlock.field<string>('panel-body')}
        buttonText={shareBlock.field<string>('panel-button-text')}
        onClickButton={inviteModalProps.onOpen}
      />
    </Accordion>
  );
}
