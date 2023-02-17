import {
  Button,
  Card,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { TipVideo } from './tip-video';

export interface TipProps {
  thumbnailSrc: string;
  title: string;
  description: string;
  url: string;
  videoId: string;
  onComplete: () => void;
}

export function Tip(props: TipProps) {
  const { thumbnailSrc, title, description, url, videoId, onComplete } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Card p={4} w="100%" bg="blue.50" border="1px" borderColor="blue.100">
        <Flex gap={4}>
          <Link onClick={onOpen} flexShrink={0}>
            <Image
              src={thumbnailSrc}
              width={207}
              height={125}
              border="1px"
              borderColor="blue.100"
              borderRadius={8}
              alt={`${title} video thumbnail`}
            />
          </Link>
          <Flex direction="column" gap={2}>
            <Text fontWeight="semibold">{title}</Text>
            <Text>{description}</Text>
            <Flex alignItems="center" gap={4}>
              <Button variant="outline" bg="white" onClick={onComplete}>
                Okay, got it!
              </Button>
              <Link href={url} color="blue.500" fontWeight="medium">
                Learn more
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {isOpen && <TipVideo id={videoId} isOpen onClose={onClose} />}
    </>
  );
}
