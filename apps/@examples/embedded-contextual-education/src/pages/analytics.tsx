import { Chart, Layout, Stat, Tip } from '@/components';
import { ANALYTICS_TIP } from '@/const';
import { Flex } from '@chakra-ui/react';
import { useBlock } from '@dopt/react';

export function Analytics() {
  const [{ state, field }, transition] = useBlock<['default']>(ANALYTICS_TIP);
  return (
    <Layout title="Analytics">
      <Flex direction="column" w="100%" gap={4}>
        {state.active && (
          <Tip
            thumbnailSrc={`${import.meta.env.BASE_URL}tip-thumb-3.png`}
            title={field('title') || ''}
            description={field('body') || ''}
            url={field('learn-more-url') || ''}
            videoId={field('video-id') || ''}
            onComplete={() => transition('default')}
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
