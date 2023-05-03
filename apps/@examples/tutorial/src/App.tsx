import { useBlock, useFlow } from '@dopt/react';
import { Commentary, States } from './components';
import './App.css';

function App() {
  // Use the `useBlock` hook to access block data and the block transition function
  const [dot1, transitionDot1] = useBlock<['next']>(
    'onboarding-tutorial.dot-1'
  );
  const [dot2, transitionDot2] = useBlock<['finish']>(
    'onboarding-tutorial.dot-2'
  );

  // Use the `useFlow` hook to access flow data and intent methods
  const [flow, flowIntent] = useFlow('onboarding-tutorial');

  return (
    <div className="app">
      <header>
        <States title="Flow state" state={flow.state} />
        {/* Reset the flow when the reset button is clicked */}
        <button onClick={flowIntent.reset}>Reset flow</button>
      </header>
      <main>
        <Commentary
          dot1={dot1.state.active}
          dot2={dot2.state.active}
          flow={flow.state.finished}
        />
        <div className="dots">
          <div className="dot-container">
            {/* Make this dot pulse when `dot-1` is active
            Transition to the next block (`dot-2`) when this dot is clicked */}
            <div
              className={`dot ${dot1.state.active ? 'active' : ''}`}
              onClick={() => transitionDot1('next')}
            ></div>
            <States title="dot-1 state" state={dot1.state} />
          </div>
          <div className="dot-container">
            {/* Make this dot pulse when `dot-2` is active
            Transition to the next block (a finish block) when this dot is clicked */}
            <div
              className={`dot ${dot2.state.active ? 'active' : ''}`}
              onClick={() => transitionDot2('finish')}
            ></div>
            <States title="dot-2 state" state={dot2.state} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
