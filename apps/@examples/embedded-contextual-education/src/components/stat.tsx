import { Card, Flex, Text } from '@chakra-ui/react';

export interface StatProps {
  title: string;
  value: number;
  unit?: string;
}

export function Stat(props: StatProps) {
  const { title, value, unit } = props;
  return (
    <Card w="100%" p={4}>
      <Flex direction="column" gap={2}>
        <Text fontWeight="semibold">{title}</Text>
        <Text fontSize="3xl" fontWeight="semibold">
          {value.toLocaleString('en-US')} {unit}
        </Text>
      </Flex>
    </Card>
  );
}
