import { Card, Flex, Image, Text } from '@chakra-ui/react';

export interface VideoProps {
  thumbnailSrc: string;
  title: string;
  length: number;
  publishDate: string;
  description: string;
  views: number;
}

export function Video(props: VideoProps) {
  const { thumbnailSrc, title, length, publishDate, description, views } =
    props;
  return (
    <Card w="100%" p={4}>
      <Flex gap={4}>
        <Image
          src={thumbnailSrc}
          width="210"
          height="140"
          borderRadius={8}
          objectFit="cover"
          alt={`${title} video thumbnail`}
        />
        <Flex direction="column" justifyContent="space-between">
          <Flex direction="column" gap={1}>
            <Text fontWeight="semibold">{title}</Text>
            <Text fontSize="xs" color="gray">
              {length} mins · {publishDate}
            </Text>
            <Text>{description}</Text>
          </Flex>
          <Text fontSize="xs" color="gray">
            {views.toLocaleString('en-US')} views
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
