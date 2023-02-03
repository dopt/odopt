import { Card, CardBody, CardHeader, Image } from '@chakra-ui/react';

export interface ChartProps {
  title: string;
}

export function Chart(props: ChartProps) {
  const { title } = props;
  return (
    <Card>
      <CardHeader fontWeight="semibold">{title}</CardHeader>
      <CardBody>
        <Image
          src={`${import.meta.env.BASE_URL}chart.svg`}
          width="100%"
          alt={`${title} chart`}
        />
      </CardBody>
    </Card>
  );
}
