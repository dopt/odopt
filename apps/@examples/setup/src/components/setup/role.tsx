import {
  useState,
  type FormEventHandler,
  type ChangeEventHandler,
} from 'react';
import { useBlock } from '@dopt/react';
import RichText from '@dopt/react-rich-text';
import { Radio } from '../radio';
import { Button } from '../button';

export function Role() {
  const [block, transition] = useBlock<['complete']>(
    'setup.famous-hornets-sniff'
  );
  const [role, setRole] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (role) {
      // Do something with the data
      // sendData(role);

      transition('complete');
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setRole(e.target.value);
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
            <Radio
              name="role"
              value="developer"
              label="🛠 Developer"
              onChange={handleChange}
            />
            <Radio
              name="role"
              value="product-manager"
              label="💡 Product manager"
              onChange={handleChange}
            />
            <Radio
              name="role"
              value="designer"
              label="🎨 Designer"
              onChange={handleChange}
            />
            <Radio
              name="role"
              value="marketer"
              label="📣 Marketer"
              onChange={handleChange}
            />
            <Radio
              name="role"
              value="sales"
              label="💼 Sales"
              onChange={handleChange}
            />
            <Radio
              name="role"
              value="other"
              label="🤔 Other"
              onChange={handleChange}
            />

            <Button type="submit" disabled={!role}>
              {block.field<string>('button')}
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
