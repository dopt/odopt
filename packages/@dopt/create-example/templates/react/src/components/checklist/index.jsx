import Checklist, {
  useChecklist,
  useChecklistItem,
} from '@dopt/react-checklist';
import { Invite } from './invite';

import { DOPT_CHECKLIST_ID, DOPT_CHECKLIST_STEP_2_ID } from '../../const';

import './styles.css';

export function ChecklistWrapper() {
  const checklist = useChecklist(DOPT_CHECKLIST_ID);
  const checklistItem2 = useChecklistItem(DOPT_CHECKLIST_STEP_2_ID);

  if (!checklist.active) return null;

  return (
    <div className="checklist-wrapper">
      <Checklist.Root>
        <Checklist.Header>
          <Checklist.Title>{checklist.title}</Checklist.Title>
        </Checklist.Header>
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
                {item.active && !item.done && (
                  <Checklist.ItemCompleteButton onClick={item.complete}>
                    {item.completeLabel}
                  </Checklist.ItemCompleteButton>
                )}
              </Checklist.ItemContent>
            </Checklist.Item>
          ))}
        </Checklist.Items>
      </Checklist.Root>

      {checklistItem2.active && <Invite onSubmit={checklistItem2.complete} />}
    </div>
  );
}
