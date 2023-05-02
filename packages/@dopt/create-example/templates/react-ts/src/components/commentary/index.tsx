import './commentary.css';

interface Props {
  dot1: boolean;
  dot2: boolean;
  flow: boolean;
}

export function Commentary(props: Props) {
  const { dot1, dot2, flow } = props;
  return (
    <div className="commentary">
      {/* Show this commentary when `dot-1` is active */}
      <p className={`commentary-p ${dot1 ? 'active' : ''}`}>
        The user enters the flow.
        <br />
        dot-1 is set to active.
        <br />
        <strong>Click the pulsing dot to transition to the next block.</strong>
      </p>
      {/* Show this commentary when `dot-2` is active */}
      <p className={`commentary-p ${dot2 ? 'active' : ''}`}>
        The flow transitions for the user.
        <br />
        dot-1 is set to inactive and dot-2 is set to active.
        <br />
        <strong>Click the pulsing dot to finish the flow.</strong>
      </p>
      {/* Show this commentary when the flow is finished */}
      <p className={`commentary-p ${flow ? 'active' : ''}`}>
        The flow is finished for the user.
        <br />
        dot-2 is set to inactive.
        <br />
        <strong>Start over by clicking reset flow.</strong>
      </p>
    </div>
  );
}
