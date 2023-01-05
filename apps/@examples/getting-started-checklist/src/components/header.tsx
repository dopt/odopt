import { IconLayoutDashboard } from '@tabler/icons';
import { Flex, Text, Button, useDisclosure } from '@chakra-ui/react';

import { useBlock } from '@dopt/react';

import { CONNECT_DATASOURCE } from '@/const';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
}

export function Header(props: Props) {
  const [datasourceBlock] = useBlock(CONNECT_DATASOURCE);

  return (
    <Flex align="center" justify="space-between">
      <Flex>
        <IconLayoutDashboard width={24} height={24} />
        <Text pl="2">Active Users</Text>
      </Flex>
      <Flex gap="3">
        {datasourceBlock.state.completed && (
          <Button
            bg="#7047EB"
            color="white"
            onClick={() => props.addChartsModalProps.onOpen()}
          >
            Add charts
          </Button>
        )}
        <Button onClick={() => props.inviteModalProps.onOpen()}>Share</Button>
      </Flex>
    </Flex>
  );
}
