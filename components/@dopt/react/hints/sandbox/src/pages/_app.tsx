import { DoptProvider, useFlow } from '@dopt/react';
import Hints, { useHintsItem } from '@dopt/react-hints';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flows={{
        'hints-component': 0,
      }}
    >
      <div className="containers">
        <div className="anchors">
          <HintsStepItem1 />
          <HintsStepItem2 />
        </div>
      </div>
      <div className="reset">
        <ResetButton />
      </div>
    </DoptProvider>
  );
}

function HintsStepItem1() {
  const hintsStep = useHintsItem('hints-component.hint-1');

  if (!hintsStep) {
    return null;
  }

  return (
    <Hints.Root active={hintsStep.active}>
      <Hints.Anchor>
        <button style={{ position: 'relative' }}>
          ANCHOR #1
          <Hints.Indicator
            onClick={() => hintsStep.setOpen(!hintsStep.open)}
            style={{
              bottom: -8,
              right: -8,
            }}
          />
        </button>
      </Hints.Anchor>
      <Hints.Popover position="bottom" open={hintsStep.open}>
        <Hints.Content>
          <Hints.Header>
            <Hints.Title>{hintsStep.title}</Hints.Title>
            <Hints.CloseIcon onClick={() => hintsStep.setOpen(false)} />
          </Hints.Header>
          <Hints.Body>{hintsStep.body}</Hints.Body>
          <Hints.Footer>
            <Hints.CompleteButton onClick={hintsStep.complete}>
              {hintsStep.completeLabel}
            </Hints.CompleteButton>
            <Hints.DismissAllButton>
              {hintsStep.dismissAllLabel}
            </Hints.DismissAllButton>
          </Hints.Footer>
        </Hints.Content>
      </Hints.Popover>
    </Hints.Root>
  );
}

function HintsStepItem2() {
  const hintsStep = useHintsItem('hints-component.hint-2');

  if (!hintsStep) {
    return null;
  }

  return (
    <Hints.Root active={hintsStep.active}>
      <Hints.Anchor>
        <button style={{ position: 'relative' }}>
          ANCHOR #2
          <Hints.Indicator
            onClick={() => hintsStep.setOpen(!hintsStep.open)}
            style={{
              top: -8,
              left: -8,
            }}
          />
        </button>
      </Hints.Anchor>
      <Hints.Popover open={hintsStep.open}>
        <Hints.Content>
          <Hints.Header>
            <Hints.Title>{hintsStep.title}</Hints.Title>
            <Hints.CloseIcon onClick={() => hintsStep.setOpen(false)} />
          </Hints.Header>
          <Hints.Body>{hintsStep.body}</Hints.Body>
          <Hints.Footer>
            <Hints.CompleteButton onClick={hintsStep.complete}>
              {hintsStep.completeLabel}
            </Hints.CompleteButton>
            <Hints.DismissAllButton onClick={hintsStep.hints?.dismiss}>
              {hintsStep.dismissAllLabel}
            </Hints.DismissAllButton>
          </Hints.Footer>
        </Hints.Content>
      </Hints.Popover>
    </Hints.Root>
  );
}

function ResetButton() {
  const [, methods] = useFlow('hints-component');
  return <button onClick={() => methods.reset()}>Reset</button>;
}
