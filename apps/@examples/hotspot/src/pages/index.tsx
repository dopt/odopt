import { useBlock } from '@dopt/react';

import { example } from '@/pages/index.css';
import { Button, Dialog, Skeleton, HotSpot } from '@/components';

export function Example() {
  const [hotspotA, hotspotAMethods] = useBlock('2ycOS_n3lxk05tPpHGw1D');
  const [hotspotB, hotspotBMethods] = useBlock('bjNFwr1qWt5-qPk1UtU7R');
  const [hotspotC, hotspotCMethods] = useBlock('N4XSt90klWbr-RZJeMSy4');

  return (
    <div className={example}>
      <Skeleton>
        <HotSpot position="ne" visible={hotspotA.state.active}>
          <Dialog title={hotspotA.getField('title', '')}>
            <div>{hotspotA.getField('body', '')}</div>
            <Button color="orange" onClick={hotspotAMethods.complete}>
              {hotspotA.getField('button', '')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="se" visible={hotspotB.state.active}>
          <Dialog title={hotspotB.getField('title', '')}>
            <div>{hotspotB.getField('body', '')}</div>
            <Button color="orange" onClick={hotspotBMethods.complete}>
              {hotspotB.getField('button', '')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
      <Skeleton>
        <HotSpot position="ne" visible={hotspotC.state.active}>
          <Dialog title={hotspotC.getField('title', '')}>
            <div>{hotspotC.getField('body', '')}</div>
            <Button color="orange" onClick={hotspotCMethods.complete}>
              {hotspotC.getField('button', '')}
            </Button>
          </Dialog>
        </HotSpot>
      </Skeleton>
    </div>
  );
}
