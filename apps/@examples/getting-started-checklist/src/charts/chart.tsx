import { type ReactNode } from 'react';
import { Flex, Card, CardBody } from '@chakra-ui/react';

interface Props {
  title: string;
  children: ReactNode;
}

export function Chart(props: Props) {
  const { title, children } = props;
  return (
    <Card>
      <CardBody>
        <Flex direction="column" gap={4}>
          <h2>{title}</h2>
          {children}
        </Flex>
      </CardBody>
    </Card>
  );
}
