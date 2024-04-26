import { useMemo } from 'react';
import { MantineProvider } from '@mantine/core';

import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';

import { nanoid } from 'nanoid';

import { Kanban } from '@/pages';

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
      optimisticUpdates={false}
      userId={userId}
      flows={{ kanban: 4 }}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Kanban />
      </MantineProvider>
    </DoptProvider>
  );
}
