import { type ReactElement } from 'react';
import { useTourItem } from '@dopt/react-tour/hooks';
import RichText from '@dopt/react-rich-text';
import { Button } from '../button';

import './styles.css';

export interface TourProps {
  id: string;
  children: ReactElement;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tour(props: TourProps) {
  const { id, children, position = 'bottom' } = props;

  // Access the tour item data from the tour block in the flow
  const item = useTourItem(id);

  const indicators = ['🌑', '🌘', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

  return (
    <div className={`tour${item.active ? ' tour--active' : ''}`}>
      <div className="tour__anchor">{children}</div>
      {item.active && (
        <div className="tour__popover" data-position={position}>
          <header className="tour__popover-header">
            <h1 className="tour__popover-title">{item.title}</h1>
          </header>
          <RichText>{item.body}</RichText>
          <footer className="tour__popover-footer">
            {item.index !== 0 && (
              <Button variant="secondary" onClick={item.back}>
                {item.backLabel}
              </Button>
            )}
            <Button onClick={item.next}>{item.nextLabel}</Button>
          </footer>
          <ul className="tour__popover-indicator">
            {indicators.map((indicator, i) => (
              <li
                key={i}
                className={`tour__popover-indicator-item${
                  item.index == i ? ' tour__popover-indicator-item--active' : ''
                }`}
              >
                {indicator}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
