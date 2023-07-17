import { useChecklist, useChecklistItem } from '@dopt/react-checklist';

import { Checklist, ChecklistItem } from '@/components';

import './index.css';

export function Home() {
  // Access the checklist data from the checklist block in the flow
  const checklist = useChecklist(
    'custom-checklist-component.cool-points-listen'
  );

  const checklistItemIds = [
    'custom-checklist-component.rude-heads-flash',
    'custom-checklist-component.common-bugs-marry',
    'custom-checklist-component.curvy-sites-feel',
  ];

  // Access the data from the checklist's individual steps from the checklist block in the flow
  const checklistItem1 = useChecklistItem(checklistItemIds[0]);
  const checklistItem2 = useChecklistItem(checklistItemIds[1]);
  const checklistItem3 = useChecklistItem(checklistItemIds[2]);

  return (
    <div className="home">
      <Checklist
        title={checklist.title}
        body={checklist.body}
        value={checklist.count('done')}
        max={checklist.size}
      >
        {checklist.items.map((item) => (
          <ChecklistItem
            key={item.id}
            title={item.title}
            body={item.body}
            completed={item.completed || item.skipped}
            onSkip={item.skip}
          >
            {item.id == checklistItemIds[0] && (
              <button
                className="button"
                disabled={item.skipped}
                onClick={checklistItem1.complete}
              >
                Click me
              </button>
            )}

            {item.id == checklistItemIds[1] && (
              <select
                className="select"
                disabled={item.skipped}
                onChange={checklistItem2.complete}
              >
                <option value="">Select a flavor</option>
                <option value="vanilla">🍨 Vanilla</option>
                <option value="chocolate">🍫 Chocolate</option>
                <option value="strawberry">🍓 Strawberry</option>
              </select>
            )}

            {item.id == checklistItemIds[2] && (
              <input
                type="email"
                pattern=".+@.+\..+"
                required
                className="input"
                disabled={item.skipped}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    checklistItem3.complete();
                  }
                }}
              />
            )}
          </ChecklistItem>
        ))}
      </Checklist>
    </div>
  );
}
