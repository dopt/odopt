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
          Active Users
        </Text>
      </Flex>
      <Flex gap="3">
        <Button
          bg="#4313AA"
          color="white"
          borderRadius="8px"
          fontWeight="medium"
          onClick={() => props.addChartsModalProps.onOpen()}
        >
          Add chart
        </Button>
        <Button
          bg="white"
          color="#061533"
          border="1px solid #DADADA"
          borderRadius="8px"
          fontWeight="medium"
          onClick={() => props.inviteModalProps.onOpen()}
        >
          Share
        </Button>
      </Flex>
    </Flex>
  );
}
