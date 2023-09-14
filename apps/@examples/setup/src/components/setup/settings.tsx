import { useState, useEffect } from 'react';
import { useBlock } from '@dopt/react';
import RichText from '@dopt/react-rich-text';
import { Checkbox } from '../checkbox';
import { Button } from '../button';
import { Avatars } from '../avatars';

export function Settings() {
  const [block, transition] = useBlock<['complete']>('setup.light-ears-wave');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
  }, [darkMode]);

  if (!block.state.active) return null;

  return (
    <section className="setup-section">
      <div className="setup-panel setup-panel--content">
        <div className="setup-container">
          <div className="setup-body">
            <h1>{block.field<string>('title')}</h1>
            <RichText>{block.field('body')}</RichText>
          </div>

          <form className="setup-form">
            <Avatars />

            <Checkbox
              label="🌜 Enable dark mode"
              checked={darkMode}
              onChange={() => setDarkMode((prev) => !prev)}
            />

            <Button onClick={() => transition('complete')}>
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
