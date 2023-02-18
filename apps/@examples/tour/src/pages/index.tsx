import { useBlock, useOrderedGroup } from '@dopt/react';

import { example } from '@/pages/index.css';
import { Button, Dialog, Skeleton, TourStep } from '@/components';

export function Example() {
  const [_, tourMethods] = useOrderedGroup('lHOsYSAAZIsx1PYkhiog5');

  const [step1] = useBlock('nCkQtTw1VzQyKdmrcBUkt');
  const [step2] = useBlock('eP9TxEeiX0BroKhgw-xbj');
  const [step3] = useBlock('NeQPD_y1PVFZBs2Zg-HTk');

  return (
    <div className={example}>
      <TourStep align="start" side="bottom" visible={step1.state.active}>
        <Skeleton />
        <Dialog title={step1.getField('title')}>
          <div>{step1.getField('body')}</div>
          <Button color="orange" onClick={tourMethods.next}>
            {step1.getField('next-button')}
          </Button>
        </Dialog>
      </TourStep>
      <TourStep align="end" side="bottom" visible={step2.state.active}>
        <Skeleton />
        <Dialog title={step2.getField('title')}>
          <div>{step2.getField('body')}</div>
          <Button color="orange" onClick={tourMethods.prev}>
            {step2.getField('prev-button')}
          </Button>
          <Button color="orange" onClick={tourMethods.next}>
            {step2.getField('next-button')}
          </Button>
        </Dialog>
      </TourStep>
      <TourStep align="start" side="top" visible={step3.state.active}>
        <Skeleton />
        <Dialog title={step3.getField('title')}>
          <div>{step3.getField('body')}</div>
          <Button color="orange" onClick={tourMethods.prev}>
            {step3.getField('prev-button')}
          </Button>
          <Button color="orange" onClick={tourMethods.next}>
            {step3.getField('next-button')}
          </Button>
        </Dialog>
      </TourStep>
    </div>
  );
}
