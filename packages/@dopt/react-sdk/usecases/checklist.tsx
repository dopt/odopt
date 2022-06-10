import { ChecklistItem, ChecklistProgress } from '@research.io/checklist';
import { useDopt } from '@dopt/react';

const Checklist = () => {
  const [calendarIntegration] = useDopt('calendar-integration-100dae3');
  const [scheduleMeeting] = useDopt('schedule-meeting-a40ea81');
  const [interview] = useDopt('interview-038dd7b');

  const steps = [calendarIntegration, scheduleMeeting, interview];

  const totalSteps = steps.length;
  const finishedSteps = steps.filter(({ finished }) => finished).length;
  const progress = (finishedSteps / totalSteps) * 100;

  return (
    <div>
      <h3>👋 Welcome to Ethnio!</h3>
      <p>Get started by completing these quick steps.</p>
      <ChecklistProgress value={progress} />
      {finishedSteps} / {totalSteps}
      <ChecklistItem
        label="Set up calendar integration"
        value={calendarIntegration.finished ? 100 : 0}
      />
      <ChecklistItem
        label="Schedule first interview"
        value={scheduleMeeting.finished ? 100 : 0}
      />
      <ChecklistItem
        label="Complete interview"
        value={interview.finished ? 100 : 0}
      />
    </div>
  );
};
