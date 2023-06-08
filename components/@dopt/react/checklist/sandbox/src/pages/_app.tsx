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
        </div>
      </div>
    </DoptProvider>
  );
}

function ChecklistComponent() {
  const checklist = useChecklist('checklist-component');
  return (
    <Checklist.Root>
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
