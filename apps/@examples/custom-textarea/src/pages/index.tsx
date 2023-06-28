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

  const [pulsing, focus] = useBlock<['default']>(
    'custom-textarea.textarea-pulsing'
  );
  const [tooltip, messageSent] = useBlock<['default']>(
    'custom-textarea.tooltip'
  );

  return (
    <div className={example}>
      <div className={textareaContainer}>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => focus('default')}
          placeholder={
            pulsing.state.active
              ? pulsing.field<string>('placeholder') || ''
              : 'Write a message'
          }
          className={`${textareaClass} ${pulsing.state.active && highlight}`}
        />
        <Notification open={tooltip.state.active}>
          {tooltip.field<string>('tip')}
        </Notification>
      </div>
      <Button
        color="blue"
        onClick={() => {
          setValue('');
          messageSent('default');
        }}
      >
        Send Message
      </Button>
    </div>
  );
}
