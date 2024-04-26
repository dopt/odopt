import { DoptProvider, useFlow } from '@dopt/react';

import Checklist, {
  useChecklist,
  useChecklistItem,
} from '@dopt/react-checklist';

export function App() {
  return (
    <DoptProvider
      userId="0"
      apiKey="blocks-blocksKey_Mg=="
      flows={{
        checklist: 0,
      }}
    >
      <div style={{ margin: 64, width: 400 }}>
        <ChecklistComponent />
        <div style={{ marginTop: 64 }}></div>
        <ResetButton />
        <FinishStep1 />
        <FinishStep2 />
        <FinishStep3 />
      </div>
    </DoptProvider>
  );
}

function ChecklistComponent() {
  const checklist = useChecklist('checklist.light-schools-divide');

  return (
    <>
      <Checklist.Root>
        <Checklist.Header>
          <Checklist.Title>{checklist.title}</Checklist.Title>
          <Checklist.DismissIcon onClick={checklist.dismiss} />
        </Checklist.Header>
        <Checklist.Body>{checklist.body}</Checklist.Body>
        <Checklist.Progress
          value={checklist.count('done')}
          max={checklist.size}
        />
        <Checklist.Items>
          {checklist.items.map((item, i) => (
            <Checklist.Item index={i} key={i}>
              <Checklist.ItemIcon>
                {item.completed ? (
                  <Checklist.IconCompleted />
                ) : item.skipped ? (
                  <Checklist.IconSkipped />
                ) : (
                  <Checklist.IconActive />
                )}
              </Checklist.ItemIcon>
              <Checklist.ItemContent>
                <Checklist.ItemTitle disabled={item.done}>
                  {item.title}
                </Checklist.ItemTitle>

                <Checklist.ItemBody disabled={item.done}>
                  {item.body}
                </Checklist.ItemBody>

                {!item.done && (
                  <Checklist.ItemCompleteButton onClick={item.complete}>
                    {item.completeLabel}
                  </Checklist.ItemCompleteButton>
                )}
              </Checklist.ItemContent>
              {!item.done && <Checklist.ItemSkipIcon onClick={item.skip} />}
            </Checklist.Item>
          ))}
        </Checklist.Items>
      </Checklist.Root>
    </>
  );
}
function ResetButton() {
  const [, methods] = useFlow('checklist');
  return <button onClick={() => methods.reset()}>Reset</button>;
}

function FinishStep1() {
  const checklistItem = useChecklistItem('checklist.ci1');
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
  const checklistItem = useChecklistItem('checklist.ci2');
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

function FinishStep3() {
  const checklistItem = useChecklistItem('checklist.ci3');
  return (
    <button
      onClick={() => {
        checklistItem.complete();
      }}
    >
      Finish Step #3
    </button>
  );
}
