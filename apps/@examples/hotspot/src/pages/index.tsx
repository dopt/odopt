import { useBlock } from '@dopt/react';

import { example } from '@/pages/index.css';
import { Button, Dialog, Skeleton, HotSpot } from '@/components';

export function Example() {
  const [hotspotA, hotspotATransition] = useBlock<['default']>('hotspots.a');
  const [hotspotB, hotspotBTransition] = useBlock<['default']>('hotspots.b');
  const [hotspotC, hotspotCTransition] = useBlock<['default']>('hotspots.c');

  return (
    <div className={example}>
      <Skeleton>
        <HotSpot position="ne" visible={hotspotA.state.active}>
          <Dialog title={hotspotA.field('title', '')}>
            <div>{hotspotA.field('body', '')}</div>
            <Button
              color="orange"
              onClick={() => hotspotATransition('default')}
            >
              {hotspotA.field('button', '')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="se" visible={hotspotB.state.active}>
          <Dialog title={hotspotB.field('title', '')}>
            <div>{hotspotB.field('body', '')}</div>
            <Button
              color="orange"
              onClick={() => hotspotBTransition('default')}
            >
              {hotspotB.field('button', '')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="ne" visible={hotspotC.state.active}>
          <Dialog title={hotspotC.field('title', '')}>
            <div>{hotspotC.field('body', '')}</div>
            <Button
              color="orange"
              onClick={() => hotspotCTransition('default')}
            >
              {hotspotC.field('button', '')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
    </div>
  );
}
