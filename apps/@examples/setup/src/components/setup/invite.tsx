import { type FormEventHandler, useState } from 'react';
import { useBlock } from '@dopt/react';
import RichText from '@dopt/react-rich-text';
import { Button } from '../button';
import { Textarea } from '../textarea';

export function Invite() {
  const [block, transition] = useBlock<['complete']>('setup.sixty-squids-rest');
  const [invites, setInvites] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (invites) {
      // Do something with the data
      // sendData(invites);

      transition('complete');
    }
  };

  if (!block.state.active) return null;

  return (
    <section className="setup-section">
      <div className="setup-panel setup-panel--content">
        <div className="setup-container">
          <div className="setup-body">
            <h1>{block.field<string>('title')}</h1>
            <RichText>{block.field('body')}</RichText>
          </div>

          <form className="setup-form" onSubmit={handleSubmit}>
            <Textarea
              placeholder="Enter teammate emails"
              rows={5}
              onChange={(e) => setInvites(e.target.value)}
            >
              {invites}
            </Textarea>

            <Button type="submit" disabled={!invites}>
              {block.field<string>('button')}
            </Button>

            <Button variant="minimal" onClick={() => transition('complete')}>
              {block.field<string>('skip-button')}
            </Button>
          </form>
        </div>
      </div>

      <div className="setup-panel setup-panel--media">
        <div className="setup-container">
          <img src={block.field('image') as string} />
        </div>
      </div>
    </section>
  );
}
