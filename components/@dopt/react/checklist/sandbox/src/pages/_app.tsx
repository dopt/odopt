import { DoptProvider, useFlow } from '@dopt/react';

import { useChecklist, useChecklistItem } from '@dopt/react-checklist';
import * as Checklist from '@dopt/react-checklist';
import { ChecklistItem } from '@dopt/semantic-data-layer-checklist';

export function App() {
  return (
    <DoptProvider
      userId="joe_mckenney"
      apiKey="blocks-blocksKey_Mg=="
      flowVersions={{
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
  const checklist = useChecklist('checklist.onboarding-checklist');

  function finished(item: ChecklistItem) {
    return item.skipped || item.completed;
  }

  return (
    <>
      <Checklist.Root>
        <Checklist.Header>
          <Checklist.Title>{checklist.title}</Checklist.Title>
          <Checklist.DismissIcon onClick={checklist.dismiss} />
        </Checklist.Header>
        <Checklist.Body>{checklist.body}</Checklist.Body>
        <Checklist.Progress
          value={checklist.count('completed') + checklist.count('skipped')}
          max={checklist.size}
        />
        <Checklist.Items>
          {checklist.items.map((item, i) => (
            <Checklist.Item key={i}>
              {item.completed ? (
                <Checklist.IconCheck />
              ) : item.skipped ? (
                <Checklist.IconSkip />
              ) : (
                <Checklist.IconCircle />
              )}
              <Checklist.ItemContent>
                <Checklist.ItemTitle disabled={finished(item)}>
                  {item.title}
                </Checklist.ItemTitle>
                <Checklist.ItemBody disabled={finished(item)}>
                  {item.body}
                </Checklist.ItemBody>
                {!finished(item) && (
                  <Checklist.ItemCompleteButton onClick={item.complete}>
                    {item.completeLabel}
                  </Checklist.ItemCompleteButton>
                )}
              </Checklist.ItemContent>
              {!finished(item) && (
                <Checklist.ItemSkipIcon onClick={item.skip} />
              )}
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
