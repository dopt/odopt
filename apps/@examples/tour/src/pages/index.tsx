import { useBlock } from '@dopt/react';

import { example } from '@/pages/index.css';
import { Button, Dialog, Skeleton, TourStep } from '@/components';

export function Example() {
  const [step1, transition1] = useBlock<['next']>('tour.step-1');
  const [step2, transition2] = useBlock<['previous', 'next']>('tour.step-2');
  const [step3, transition3] = useBlock<['previous', 'next']>('tour.step-3');

  return (
    <div className={example}>
      <TourStep align="start" side="bottom" visible={step1.state.active}>
        <Skeleton />
        <Dialog title={step1.field('title')}>
          <div>{step1.field('body')}</div>
          <Button color="orange" onClick={() => transition1('next')}>
            {step1.field('next-button')}
          </Button>
        </Dialog>
      </TourStep>
      <TourStep align="end" side="bottom" visible={step2.state.active}>
        <Skeleton />
        <Dialog title={step2.field('title')}>
          <div>{step2.field('body')}</div>
          <Button color="orange" onClick={() => transition2('previous')}>
            {step2.field('prev-button')}
          </Button>
          <Button color="orange" onClick={() => transition2('next')}>
            {step2.field('next-button')}
          </Button>
        </Dialog>
      </TourStep>
      <TourStep align="start" side="top" visible={step3.state.active}>
        <Skeleton />
        <Dialog title={step3.field('title')}>
          <div>{step3.field('body')}</div>
          <Button color="orange" onClick={() => transition3('previous')}>
            {step3.field('prev-button')}
          </Button>
          <Button color="orange" onClick={() => transition3('next')}>
            {step3.field('next-button')}
          </Button>
        </Dialog>
      </TourStep>
    </div>
  );
}
