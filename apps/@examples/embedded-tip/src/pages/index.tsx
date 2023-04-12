import { useBlock } from '@dopt/react';

import { example, embeddedTipContainer } from '@/pages/index.css';

import { Button, Skeletons, Notification } from '@/components/';

export function Example() {
  const [tip, transition] = useBlock<['default']>('embedded-tip.tip');

  return (
    <div className={example}>
      <Skeletons.Header />
      <div className={embeddedTipContainer}>
        <Notification title={tip.field('title', '')} open={tip.state.active}>
          <div>{tip.field('body')}</div>
          <Button color="green" onClick={() => transition('default')}>
            {tip.field('button')}
          </Button>
        </Notification>
      </div>
      <Skeletons.Body />
    </div>
  );
}
