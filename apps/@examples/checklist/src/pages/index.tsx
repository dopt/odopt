import Checklist, {
  useChecklist,
  useChecklistItem,
} from '@dopt/react-checklist';

import './index.css';

export function Home() {
  // Access the checklist data from the checklist block in the flow
  const checklist = useChecklist('checklist-component.sad-toes-dream');

  // Access the data from the checklist's second step from the checklist block in the flow
  const checklistItem2 = useChecklistItem(
    'checklist-component.heavy-lands-lose'
  );

  // Access the data from the checklist's third step from the checklist block in the flow
  const checklistItem3 = useChecklistItem(
    'checklist-component.stale-banks-drum'
  );

  return (
    <div className="home">
      <div className="checklist">
        <Checklist.Root>
          <Checklist.Header>
            <Checklist.Title>{checklist.title}</Checklist.Title>
          </Checklist.Header>
          <Checklist.Body>{checklist.body}</Checklist.Body>
          <Checklist.Progress
            value={checklist.count('done')}
            max={checklist.size}
          />
          <Checklist.Items>
            {checklist.items.map((item, i) => (
              <Checklist.Item index={i} key={i}>
                {item.completed ? (
                  <Checklist.IconCheck />
                ) : item.skipped ? (
                  <Checklist.IconSkip />
                ) : (
                  <Checklist.IconCircle />
                )}
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
      </div>
      <div className="controls">
        <button
          className="control"
          // Add a click handler to complete the second step
          onClick={checklistItem2.complete}
          // Disable the button when the second step is completed or skipped
          disabled={checklistItem2.completed || checklistItem2.skipped}
        >
          Complete step 2
        </button>

        <input
          type="email"
          pattern=".+@.+\..+"
          placeholder="Enter an email to complete step 3"
          required
          className="control"
          // Add a change handler to complete the third step when a valid email is entered
          onChange={(e) => {
            if (e.target.validity.valid) {
              checklistItem3.complete();
            }
          }}
          // Disable the button when the third step is skipped
          disabled={checklistItem3.skipped}
        />
      </div>
    </div>
  );
}
