import { useRef } from 'react';

export interface ChecklistProgressProps {
  value: number;
  max: number;
}

export function ChecklistProgress(props: ChecklistProgressProps) {
  const { value, max } = props;
  const pathRef = useRef<SVGCircleElement>(null);

  const circleAttrs = {
    cx: 32,
    cy: 32,
    r: 24,
    strokeWidth: 12,
  };

  const pathLength = pathRef.current ? pathRef.current.getTotalLength() : 0;

  const tasksRemaining = max - value;

  const getMessage = () => {
    const percentage = (value / max) * 100;

    if (percentage == 0) {
      return `🚀 Let's get rolling!`;
    }

    if (percentage <= 25) {
      return '👏 Off to a great start!';
    }

    if (percentage == 50) {
      return '✨ Halfway there!';
    }

    if (percentage < 100) {
      return '🙌 Almost done!';
    }

    if (percentage == 100) {
      return '🎉 All done!';
    }
  };

  const offset = pathLength - (value / max) * pathLength || 0;

  return (
    <div className="checklist__progress">
      <div className="checklist__progress-content">
        <p className="checklist__progress-content-status">
          {tasksRemaining == 0
            ? 'Tasks complete'
            : `${tasksRemaining} task${tasksRemaining == 1 ? '' : 's'} left`}
        </p>
        <p className="checklist__progress-content-message">{getMessage()}</p>
      </div>
      <svg
        width={64}
        height={64}
        viewBox="0 0 64 64"
        fill="transparent"
        className="checklist__progress-meter"
      >
        <circle {...circleAttrs} stroke="#e9ecef"></circle>
        <circle
          {...circleAttrs}
          strokeDasharray={pathLength}
          strokeLinecap="round"
          stroke="#22b8cf"
          className="checklist__progress-meter-fill"
          style={{ strokeDashoffset: offset }}
          ref={pathRef}
        ></circle>
      </svg>
    </div>
  );
}
