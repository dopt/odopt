import { Flex } from '@chakra-ui/react';
import { Layout, Tip, Video } from '@/components';
import { useBlock } from '@dopt/react';
import { LIBRARY_TIP } from '@/const';

export function Index() {
  const [{ state, field }, transition] = useBlock<['default']>(LIBRARY_TIP);

  const allHandsVideo = (
    <Video
      thumbnailSrc={`${import.meta.env.BASE_URL}thumb-1.jpg`}
      title="All-hands"
      length={42}
      publishDate="April 04, 2023"
      description="Recording of April’s all hands where we covered Q1 results and
    check-in on yearly goals."
      views={1430}
    />
  );

  const salesCallVideo = (
    <Video
      thumbnailSrc={`${import.meta.env.BASE_URL}thumb-2.jpg`}
      title="Sales call with Acme"
      length={24}
      publishDate="March 21, 2023"
      description="Sales call with Acme where we closed the deal.  Watch to see our sales playbook in action."
      views={340}
    />
  );

  return (
    <Layout title="Library">
      <Flex direction="column" gap={4} width="100%">
        {state.active && (
          <Tip
            thumbnailSrc={`${import.meta.env.BASE_URL}tip-thumb-1.png`}
            title={field('title') || ''}
            description={field('body') || ''}
            url={field('learn-more-url') || ''}
            videoId={field('video-id') || ''}
            onComplete={() => transition('default')}
          />
        )}
        {[...Array(6)].map((e, i) => {
          if (i % 2) {
            return salesCallVideo;
          }
          return allHandsVideo;
        })}
      </Flex>
    </Layout>
  );
}
