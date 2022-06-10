import { ChecklistItem, ChecklistProgress } from '@research.io/checklist';
import { useDopt, groupStats } from '@dopt/react';

const Checklist = () => {
  const [calendarIntegration] = useDopt('calendar-integration-100dae3');
  const [scheduleMeeting, { start }] = useDopt('schedule-meeting-a40ea81');
  const [interview] = useDopt('interview-038dd7b');

  const { percentageDone, numFinished, total } = groupStats(
    calendarIntegration,
    scheduleMeeting,
    interview
  );

  return (
    <div>
      <h3>👋 Welcome to Ethnio!</h3>
      <p>Get started by completing these quick steps.</p>
      <ChecklistProgress value={percentageDone} />
      {numFinished} / {total}
      <ChecklistItem
        label="Set up calendar integration"
        value={calendarIntegration.finished ? 100 : 0}
      />
      <ChecklistItem
        label="Schedule first interview"
        onClick={start}
        value={scheduleMeeting.finished ? 100 : 0}
      />
      <ChecklistItem
        label="Complete interview"
        value={interview.finished ? 100 : 0}
      />
    </div>
  );
};
