import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';

import { useMemo } from 'react';
import { nanoid } from 'nanoid';

import { Home } from '@/pages';
import './_app.css';

export function App() {
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
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      userId={userId}
      flowVersions={{ 'card-component': 1 }}
    >
      <Home />
    </DoptProvider>
  );
}
