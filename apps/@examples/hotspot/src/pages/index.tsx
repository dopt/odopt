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
          <Dialog title={hotspotA.field<string>('title')}>
            <div>{hotspotA.field<string>('body')}</div>
            <Button
              color="orange"
              onClick={() => hotspotATransition('default')}
            >
              {hotspotA.field<string>('button')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="se" visible={hotspotB.state.active}>
          <Dialog title={hotspotB.field<string>('title')}>
            <div>{hotspotB.field<string>('body')}</div>
            <Button
              color="orange"
              onClick={() => hotspotBTransition('default')}
            >
              {hotspotB.field<string>('button')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="ne" visible={hotspotC.state.active}>
          <Dialog title={hotspotC.field<string>('title')}>
            <div>{hotspotC.field<string>('body')}</div>
            <Button
              color="orange"
              onClick={() => hotspotCTransition('default')}
            >
              {hotspotC.field<string>('button')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
    </div>
  );
}
