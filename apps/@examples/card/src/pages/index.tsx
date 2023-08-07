import { SkeletonHeader, SkeletonBody } from '@/components';
import Card, { useCard } from '@dopt/react-card';

import './index.css';

export function Home() {
  // Access the card data from the card block in the flow
  const card = useCard('card-component.proud-birds-scream');

  return (
    <div className="home">
      <SkeletonHeader />

      <Card.Root active={card.active}>
        <Card.Content>
          <Card.Header>
            <Card.Title>{card.title}</Card.Title>
            <Card.DismissIcon onClick={card.dismiss} />
          </Card.Header>
          <Card.Body>{card.body}</Card.Body>
          <Card.Footer>
            <Card.DismissButton onClick={card.dismiss}>
              {card.dismissLabel}
            </Card.DismissButton>
            <Card.CompleteButton onClick={card.complete}>
              {card.completeLabel}
            </Card.CompleteButton>
          </Card.Footer>
        </Card.Content>
      </Card.Root>

      <SkeletonBody />
    </div>
  );
}
