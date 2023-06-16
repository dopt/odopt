import { DoptProvider, useFlow } from '@dopt/react';

import { useChecklist, useChecklistItem } from '@dopt/react-checklist';
import * as Checklist from '@dopt/react-checklist';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flowVersions={{
        'checklist-journey': 0,
      }}
    >
      <div style={{ margin: 64, width: 400 }}>
        <ChecklistComponent />
        <div style={{ marginTop: 64 }}></div>
        <ResetButton />
        <FinishStep1 />
        <FinishStep2 />
      </div>
    </DoptProvider>
  );
}

function ChecklistComponent() {
  const checklist = useChecklist('checklist-journey.sequential-block');

  return (
    <Checklist.Root active={checklist.active}>
      <Checklist.Header>
        <Checklist.Title>{checklist.title}</Checklist.Title>
        <Checklist.DismissIcon onClick={checklist.dismiss} />
      </Checklist.Header>
      <Checklist.Body>{checklist.body}</Checklist.Body>
      <Checklist.Progress
        value={checklist.count('completed')}
        max={checklist.size}
      />
      <Checklist.Items items={checklist.items} />
    </Checklist.Root>
  );
}
function ResetButton() {
  const [, methods] = useFlow('checklist-journey');
  return <button onClick={() => methods.reset()}>Reset</button>;
}

function FinishStep1() {
  const checklistItem = useChecklistItem(
    'checklist-journey.sequential-item-block-1'
  );
  return (
    <button
      onClick={() => {
        checklistItem.complete();
      }}
    >
      Finish Step #1
    </button>
  );
}
function FinishStep2() {
  const checklistItem = useChecklistItem(
    'checklist-journey.sequential-item-block-2'
  );
  return (
    <button
      onClick={() => {
        checklistItem.complete();
      }}
    >
      Finish Step #2
    </button>
  );
}
