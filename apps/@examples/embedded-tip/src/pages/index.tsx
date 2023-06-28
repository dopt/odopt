import { useBlock } from '@dopt/react';

import { example, embeddedTipContainer } from '@/pages/index.css';

import { Button, Skeletons, Notification } from '@/components/';

export function Example() {
  const [tip, transition] = useBlock<['default']>('embedded-tip.tip');

  return (
    <div className={example}>
      <Skeletons.Header />
      <div className={embeddedTipContainer}>
        <Notification
          title={tip.field<string>('title')}
          open={tip.state.active}
        >
          <div>{tip.field<string>('body')}</div>
          <Button color="green" onClick={() => transition('default')}>
            {tip.field<string>('button')}
          </Button>
        </Notification>
      </div>
      <Skeletons.Body />
    </div>
  );
}
