import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';

import { useMemo } from 'react';
import { nanoid } from 'nanoid';

import { DOPT_FLOW_ID } from './const';
import {
  Header,
  ChecklistWrapper,
  TourWrapper,
  ModalWrapper,
  NextSteps,
} from './components';

function App() {
  /**
   * Create a static example user.
   */
  const user = useMemo(
    () => ({
      identifier: nanoid(),
      properties: {
        company: 'Dopt',
        role: 'admin',
        inTrial: true,
      },
    }),
    []
  );

  /**
   * Identify the example user to Dopt the first time the App loads.
   */
  const userId = useIdentifyUser(user);

  return (
    <DoptProvider
      userId={userId}
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      flows={{ [DOPT_FLOW_ID]: 2 }}
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
