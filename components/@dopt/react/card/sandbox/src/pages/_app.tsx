import { DoptProvider, useFlow } from '@dopt/react';

import Card, { useCard } from '@dopt/react-card';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flows={{
        card: 0,
      }}
    >
      <CardComponent />
      <div>
        <ResetButton />
      </div>
    </DoptProvider>
  );
}

function CardComponent() {
  const card = useCard('card.fifty-eels-lie');

  return (
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
  );
}

function ResetButton() {
  const [, methods] = useFlow('card');
  return <button onClick={() => methods.reset()}>reset</button>;
}
