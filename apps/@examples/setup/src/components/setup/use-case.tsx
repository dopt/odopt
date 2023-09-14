import {
  useState,
  type FormEventHandler,
  type ChangeEventHandler,
} from 'react';
import { useBlock } from '@dopt/react';
import RichText from '@dopt/react-rich-text';
import { Checkbox } from '../checkbox';
import { Button } from '../button';

export function UseCase() {
  const [block, transition] = useBlock<['complete']>('setup.every-cars-change');
  const [useCase, setUseCase] = useState<string[]>([]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (useCase) {
      // Do something with the data
      // sendData(useCase);

      transition('complete');
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target;

    setUseCase((prev) => {
      if (target.checked) {
        prev.push(target.value);
        return [...new Set(prev)];
      }

      return prev.filter((i) => i != target.value);
    });
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
            <Checkbox
              name="use-case"
              value="moodboard"
              label="🌅 Moodboards"
              onChange={handleChange}
            />
            <Checkbox
              name="use-case"
              value="diagram"
              label="🧩 Diagrams"
              onChange={handleChange}
            />
            <Checkbox
              name="use-case"
              value="presentation"
              label="📈 Presentations"
              onChange={handleChange}
            />
            <Checkbox
              name="use-case"
              value="documentation"
              label="📖 Documentation"
              onChange={handleChange}
            />
            <Checkbox
              name="use-case"
              value="advertisements"
              label="📢 Ads"
              onChange={handleChange}
            />
            <Checkbox
              name="use-case"
              value="other"
              label="🤔 Something else"
              onChange={handleChange}
            />

            <Button type="submit" disabled={!useCase.length}>
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
