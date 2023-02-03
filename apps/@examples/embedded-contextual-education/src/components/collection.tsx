import { Card, CardBody, Flex, Image, Text } from '@chakra-ui/react';

export interface CollectionProps {
  thumbnailSrc: string;
  title: string;
  videoCount: number;
}

export function Collection(props: CollectionProps) {
  const { thumbnailSrc, title, videoCount } = props;
  return (
    <Card overflow="hidden">
      <Image
        src={thumbnailSrc}
        width={490}
        height={200}
        objectFit="cover"
        alt={`${title} collection thumbnail`}
      />
      <CardBody>
        <Flex direction="column" gap={2}>
          <Text fontWeight="semibold">{title}</Text>
          <Text fontSize="xs" color="gray">
            {videoCount} videos
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}
