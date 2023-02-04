import { useContext } from 'react';
import { RouterContext } from '@/context';
import { IconVideo, IconBookmarks, IconGraph } from '@tabler/icons';
import { Flex, Link, Text, Avatar } from '@chakra-ui/react';

export function Navigation() {
  const { route, setRoute } = useContext(RouterContext);
  return (
    <Flex
      direction="column"
      justify="space-between"
      p={4}
      w="100%"
      bg="gray.50"
      borderRight="1px"
      borderRightColor="gray.100"
    >
      <Flex direction="column" gap={4}>
        <Text fontSize="2xl" fontWeight="semibold">
          Recordit
        </Text>
        <Link
          color={route == 'index' ? 'blue.500' : ''}
          onClick={() => setRoute('index')}
          fontWeight="medium"
        >
          <Flex gap={2}>
            <IconVideo /> Library
          </Flex>
        </Link>
        <Link
          color={route == 'collections' ? 'blue.500' : ''}
          onClick={() => setRoute('collections')}
          fontWeight="medium"
        >
          <Flex gap={2}>
            <IconBookmarks /> Collections
          </Flex>
        </Link>
        <Link
          color={route == 'analytics' ? 'blue.500' : ''}
          onClick={() => setRoute?.('analytics')}
          fontWeight="medium"
        >
          <Flex gap={2}>
            <IconGraph /> Analytics
          </Flex>
        </Link>
      </Flex>
      <Flex alignItems="center" gap={3}>
        <Avatar name="Darius Recorder" size="sm" background="purple.200" />
        <Text fontWeight="medium">Darius Recorder</Text>
      </Flex>
    </Flex>
  );
}
