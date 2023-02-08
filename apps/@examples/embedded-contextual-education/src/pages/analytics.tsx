import { Chart, Layout, Stat, Tip } from '@/components';
import { ANALYTICS_TIP } from '@/const';
import { Flex } from '@chakra-ui/react';
import { useBlock } from '@dopt/react';

export function Analytics() {
  const [{ state }, { complete }] = useBlock(ANALYTICS_TIP);
  return (
    <Layout title="Analytics">
      <Flex direction="column" w="100%" gap={4}>
        {state.active && (
          <Tip
            thumbnailSrc={`${import.meta.env.BASE_URL}tip-thumb-3.png`}
            title="Understand your impact"
            description="Analytics gives you insight into account-wide trends, performance of individual videos, and viewers stats so you know what’s working and what’s not."
            onComplete={complete}
          />
        )}
        <Flex gap={4}>
          <Stat title="Total Plays" value={1348} />
          <Stat title="Unique Plays" value={824} />
          <Stat title="Total Time Played" value={89} unit="hours" />
        </Flex>
        <Chart title="Plays, Last 7 Days" />
      </Flex>
    </Layout>
  );
}