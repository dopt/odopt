import { DoptProvider, useFlow } from '@dopt/react';
import Tour, { useTourItem } from '@dopt/react-tour';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flows={{
        tour: 0,
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
  const tourStep = useTourItem('tour.shaggy-horses-sniff');

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
            <Tour.DismissIcon onClick={tourStep.tour?.dismiss} />
          </Tour.Header>
          <Tour.Body>{tourStep.body}</Tour.Body>
          <Tour.Footer>
            <Tour.BackButton>{tourStep.backLabel}</Tour.BackButton>
            <Tour.NextButton onClick={tourStep.next}>
              {tourStep.nextLabel}
            </Tour.NextButton>
          </Tour.Footer>
          <Tour.Progress
            count={tourStep.tour?.size || 1}
            index={tourStep.index}
          />
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}

function TourStepItem2() {
  const tourStep = useTourItem('tour.poor-lions-argue');

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
            <Tour.DismissIcon onClick={tourStep.tour?.dismiss} />
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
          <Tour.Progress
            count={tourStep.tour?.size || 1}
            index={tourStep.index || 0}
          />
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}

function ResetButton() {
  const [, methods] = useFlow('tour');
  return <button onClick={() => methods.reset()}>Reset</button>;
}
