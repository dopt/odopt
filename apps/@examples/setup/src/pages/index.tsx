import { Setup, Skeleton } from '@/components';
import { useFlow, useFlowStatus } from '@dopt/react';

import './index.css';

export function Home() {
  const flowStatus = useFlowStatus('setup');
  const [flow] = useFlow('setup');

  // Wait for the flow to be initialized
  if (flowStatus.pending && !flowStatus.failed) {
    return 'Loading...';
  }

  // Show the setup if the user has not completed it yet
  if (flow.state.started && !flow.state.finished && !flow.state.stopped) {
    return <Setup />;
  }

  return (
    <div className="home">
      <Skeleton />
    </div>
  );
}
