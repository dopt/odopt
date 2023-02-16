import {
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Link,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { TipVideo } from './tip-video';

export interface CollectionTipProps {
  thumbnailSrc: string;
  description: string;
  url: string;
  videoId: string;
  onComplete: () => void;
}

export function CollectionTip(props: CollectionTipProps) {
  const { thumbnailSrc, description, url, videoId, onComplete } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Card bg="blue.50" border="1px" borderColor="blue.100" overflow="hidden">
        <Link onClick={onOpen}>
          <Image
            src={thumbnailSrc}
            width={490}
            height={200}
            objectFit="cover"
            alt="Collection tip thumbnail"
          />
        </Link>
        <CardBody>
          <Flex direction="column" gap={2}>
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
        </CardBody>
      </Card>
      {isOpen && <TipVideo id={videoId} isOpen onClose={onClose} />}
    </>
  );
}
