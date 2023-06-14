import { DoptProvider, useFlow } from '@dopt/react';
import { useChecklist } from '@dopt/react-checklist';
import * as Checklist from '@dopt/react-checklist';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-9147ae6ee202b7fa09e22f5f77c91213b3df0220286083ed2c54c8453c0008ac_MTMz"
      flowVersions={{
        'checklist-component': 0,
      }}
    >
      <div style={{ margin: 64, width: 400 }}>
        <ChecklistComponent />
        <div style={{ marginTop: 64 }}>
          <ResetButton />
          <FinishStep1 />
          <FinishStep2 />
          <FinishStep3 />
        </div>
      </div>
    </DoptProvider>
  );
}

function ChecklistComponent() {
  const checklist = useChecklist('checklist-component');
  return (
    <Checklist.Root active={checklist.active}>
      <Checklist.Header>
        <Checklist.Title>{checklist.title}</Checklist.Title>
        <Checklist.DismissIcon onClick={checklist.dismiss} />
      </Checklist.Header>
      <Checklist.Body>{checklist.body}</Checklist.Body>
      <Checklist.Progress
        value={checklist.getCompletedItems().length}
        max={checklist.items.length}
      />
      <Checklist.Items items={checklist.items} />
    </Checklist.Root>
  );
}

function ResetButton() {
  const [, methods] = useFlow('checklist-component');
  return <button onClick={() => methods.reset()}>Reset</button>;
}

function FinishStep1() {
  const checklist = useChecklist('checklist-component');
  return (
    <button onClick={() => checklist.items[0].complete()}>
      Finish Step #1
    </button>
  );
}
function FinishStep2() {
  const checklist = useChecklist('checklist-component');
  return (
    <button onClick={() => checklist.items[1].complete()}>
      Finish Step #2
    </button>
  );
}
function FinishStep3() {
  const checklist = useChecklist('checklist-component');
  return (
    <button onClick={() => checklist.items[2].complete()}>
      Finish Step #3
    </button>
  );
}
