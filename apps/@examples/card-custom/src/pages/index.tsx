import { Button, Card, SkeletonHeader, SkeletonBody } from '@/components';
import { useCard } from '@dopt/react-card/hooks';
import RichText from '@dopt/react-rich-text';

import './index.css';

export function Home() {
  // Access the card data from the card block in the flow
  const card = useCard('custom-card-component.small-rooms-allow');

  return (
    <div className="home">
      <SkeletonHeader />

      {card.active && (
        <Card title={card.title}>
          <RichText>{card.body}</RichText>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <Button variant="minimal" onClick={card.dismiss}>
              {card.dismissLabel}
            </Button>
            <Button onClick={card.complete}>{card.completeLabel}</Button>
          </div>
        </Card>
      )}

      <SkeletonBody />
    </div>
  );
}
