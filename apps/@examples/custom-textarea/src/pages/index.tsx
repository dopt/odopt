import { useBlock } from '@dopt/react';

import {
  example,
  textareaClass,
  textareaContainer,
  highlight,
} from '@/pages/index.css';
import { Button, Notification } from '@/components';
import { useState } from 'react';

export function Example() {
  const [value, setValue] = useState<string>();

  const [pulsing, focus] = useBlock('xgTRRhOUklMW96Ym3dKGB');
  const [tooltip, messageSent] = useBlock('sWzq5tWVz4i2pPnGhxBLW');

  return (
    <div className={example}>
      <div className={textareaContainer}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={focus.complete}
          placeholder={
            pulsing.state.active
              ? pulsing.getField('placeholder', '') || ''
              : 'Write a message'
          }
          className={`${textareaClass} ${pulsing.state.active && highlight}`}
        />
        <Notification open={tooltip.state.active}>
          {tooltip.getField('tip')}
        </Notification>
      </div>
      <Button
        color="blue"
        onClick={() => {
          setValue('');
          messageSent.complete();
        }}
      >
        Send Message
      </Button>
    </div>
  );
}
