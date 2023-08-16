import { DoptProvider } from '@dopt/react';
import { DOPT_FLOW_ID } from './const';

import { useIdentifyUser } from './hooks';

import {
  Header,
  ChecklistWrapper,
  TourWrapper,
  ModalWrapper,
  NextSteps,
} from './components';

function App() {
  const userId = useIdentifyUser({
    company: 'Dopt',
    role: 'admin',
    inTrial: true,
  });

  return (
    <DoptProvider
      userId={userId}
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      flowVersions={{ [DOPT_FLOW_ID]: 2 }}
    >
      <Header />
      <ChecklistWrapper />
      <TourWrapper />
      <ModalWrapper />
      <NextSteps />
    </DoptProvider>
  );
}

export default App;
