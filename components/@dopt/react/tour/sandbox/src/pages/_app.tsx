import { DoptProvider, useFlow } from '@dopt/react';
import { useTour } from '@dopt/react-tour';
import * as Tour from '@dopt/react-tour';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-9147ae6ee202b7fa09e22f5f77c91213b3df0220286083ed2c54c8453c0008ac_MTMz"
      flowVersions={{
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
  const tour = useTour('tour');

  const step1 = tour.items.find((item) => item.id === 'i123jzeOlqc06ZJiVh0CI');

  if (!step1) {
    return null;
  }

  return (
    <Tour.Root>
      <Tour.Anchor>
        <button>ANCHOR #1</button>
      </Tour.Anchor>
      <Tour.Popover open={step1.active}>
        <Tour.Content>
          <Tour.Header>
            <Tour.Title>{step1.title}</Tour.Title>
            <Tour.DismissIcon onClick={() => {}} />
          </Tour.Header>
          <Tour.Body>{step1.body}</Tour.Body>
          <Tour.Footer>
            <Tour.BackButton>{step1.backLabel}</Tour.BackButton>
            <Tour.NextButton onClick={step1.next}>
              {step1.nextLabel}
            </Tour.NextButton>
          </Tour.Footer>
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}

function TourStepItem2() {
  const tour = useTour('tour');

  const step2 = tour.items.find((item) => item.id === '0IpwUwHqO_cAbftfHfGCk');

  if (!step2) {
    return null;
  }

  return (
    <Tour.Root>
      <Tour.Anchor>
        <button>ANCHOR #2</button>
      </Tour.Anchor>
      <Tour.Popover open={step2.active}>
        <Tour.Content>
          <Tour.Header>
            <Tour.Title>{step2.title}</Tour.Title>
            <Tour.DismissIcon onClick={() => {}} />
          </Tour.Header>
          <Tour.Body>{step2.body}</Tour.Body>
          <Tour.Footer>
            <Tour.BackButton onClick={step2.back}>
              {step2.backLabel}
            </Tour.BackButton>
            <Tour.NextButton onClick={step2.next}>
              {step2.nextLabel}
            </Tour.NextButton>
          </Tour.Footer>
        </Tour.Content>
      </Tour.Popover>
    </Tour.Root>
  );
}

function ResetButton() {
  const [, methods] = useFlow('tour');
  return <button onClick={() => methods.reset()}>Reset</button>;
}
