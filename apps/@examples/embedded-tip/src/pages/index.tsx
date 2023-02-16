import { useBlock } from '@dopt/react';

import { example, embeddedTipContainer } from '@/pages/index.css';

import { Button, Skeletons, Notification } from '@/components/';

export function Example() {
  const [tip, methods] = useBlock('3QjH0QQ9L7V1FDbuEBzaH');

  return (
    <div className={example}>
      <Skeletons.Header />
      <div className={embeddedTipContainer}>
        <Notification title={tip.getField('title', '')} open={tip.state.active}>
          <div>{tip.getField('body')}</div>
          <Button color="green" onClick={methods.complete}>
            {tip.getField('button')}
          </Button>
        </Notification>
      </div>
      <Skeletons.Body />
    </div>
  );
}
