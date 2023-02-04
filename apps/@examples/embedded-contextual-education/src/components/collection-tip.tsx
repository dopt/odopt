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
  title: string;
  description: string;
  onComplete: () => void;
}

export function CollectionTip(props: CollectionTipProps) {
  const { thumbnailSrc, title, description, onComplete } = props;
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
            alt={`${title} collection tip thumbnail`}
          />
        </Link>
        <CardBody>
          <Flex direction="column" gap={2}>
            <Text>{description}</Text>
            <Flex alignItems="center" gap={4}>
              <Button variant="outline" bg="white" onClick={onComplete}>
                Okay, got it!
              </Button>
              <Link color="blue.500" fontWeight="medium">
                Learn more
              </Link>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      {isOpen && <TipVideo isOpen onClose={onClose} />}
    </>
  );
}
