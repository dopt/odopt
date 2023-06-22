import { DoptProvider, useFlow } from '@dopt/react';
import { useTourItem } from '@dopt/react-tour';
import * as Tour from '@dopt/react-tour';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flowVersions={{
        'tour-updates': 0,
      }}
    >
      <div className="containers">
        <div className="anchors">
          <TourStepItem1 />
          <TourStepItem2 />
        </div>
      </div>
      <div className="reset">
        <ResetButton />
      </div>
    </DoptProvider>
  );
}

function TourStepItem1() {
  const tourStep = useTourItem('tour-updates.tour-step-1');

  if (!tourStep) {
    return null;
  }

  return (
    <Tour.Root active={tourStep.active}>
      <Tour.Anchor>
        <button>ANCHOR #1</button>
      </Tour.Anchor>
      <Tour.Popover position="bottom">
        <Tour.Content>
          <Tour.Header>
            <Tour.Title>{tourStep.title}</Tour.Title>
            <Tour.DismissIcon onClick={tourStep.dismiss} />
          </Tour.Header>
          <Tour.Body>{tourStep.body}</Tour.Body>
          <Tour.Footer>
            <Tour.BackButton>{tourStep.backLabel}</Tour.BackButton>
            <Tour.NextButton onClick={tourStep.next}>
              {tourStep.nextLabel}
            </Tour.NextButton>
          </Tour.Footer>
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}

function TourStepItem2() {
  const tourStep = useTourItem('tour-updates.tour-step-2');

  if (!tourStep) {
    return null;
  }

  return (
    <Tour.Root active={tourStep.active}>
      <Tour.Anchor>
        <button>ANCHOR #2</button>
      </Tour.Anchor>
      <Tour.Popover>
        <Tour.Content>
          <Tour.Header>
            <Tour.Title>{tourStep.title}</Tour.Title>
            <Tour.DismissIcon onClick={tourStep.dismiss} />
          </Tour.Header>
          <Tour.Body>{tourStep.body}</Tour.Body>
          <Tour.Footer>
            <Tour.BackButton onClick={tourStep.back}>
              {tourStep.backLabel}
            </Tour.BackButton>
            <Tour.NextButton onClick={tourStep.next}>
              {tourStep.nextLabel}
            </Tour.NextButton>
          </Tour.Footer>
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}

function ResetButton() {
  const [, methods] = useFlow('tour-updates');
  return <button onClick={() => methods.reset()}>Reset</button>;
}
