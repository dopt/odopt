import { ChecklistItem, ChecklistProgress } from '@research.io/checklist';
import { useDopt, groupStats } from '@dopt/react';

const Checklist = () => {
  const [calendarIntegration, calendarIntegrationActions] = useDopt(
    'calendar-integration-100dae3'
  );
  const [scheduleMeeting, scheduleMeetingActions] = useDopt(
    'schedule-meeting-a40ea81'
  );
  const [interview, interviewActions] = useDopt('interview-038dd7b');

  const checkListItems = [calendarIntegration, scheduleMeeting, interview];

  if (!checkListItems.every(({ active }) => active)) {
    return null;
  }

  const { percentageDone, numFinished, total } = groupStats(...checkListItems);

  return (
    <div>
      <h3>👋 Welcome to Ethnio!</h3>
      <p>Get started by completing these quick steps.</p>
      <ChecklistProgress value={percentageDone} />
      {numFinished} / {total}
      <ChecklistItem
        label="Set up calendar integration"
        onClick={calendarIntegrationActions.start}
        completed={calendarIntegration.completed}
      />
      <ChecklistItem
        label="Schedule first interview"
        onClick={scheduleMeetingActions.start}
        completed={scheduleMeeting.completed}
      />
      <ChecklistItem
        label="Complete interview"
        onClick={interviewActions.start}
        completed={interview.completed}
      />
    </div>
  );
};
