import { Flex, Text, Button, useDisclosure } from '@chakra-ui/react';

interface Props {
  datasourceModalProps: ReturnType<typeof useDisclosure>;
  inviteModalProps: ReturnType<typeof useDisclosure>;
  addChartsModalProps: ReturnType<typeof useDisclosure>;
}

export function Header(props: Props) {
  return (
    <Flex align="center" justify="space-between">
      <Flex>
        <Text fontWeight="medium" fontSize="xl" color="#172B4D">
          Active users
        </Text>
      </Flex>
      <Flex gap={2}>
        <Button
          colorScheme="blue"
          onClick={() => props.addChartsModalProps.onOpen()}
        >
          Add chart
        </Button>
        <Button
          variant="outline"
          onClick={() => props.inviteModalProps.onOpen()}
        >
          Share
        </Button>
      </Flex>
    </Flex>
  );
}
