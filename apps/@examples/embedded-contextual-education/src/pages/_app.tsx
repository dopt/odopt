import { useMemo } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';

import { nanoid } from 'nanoid';
import { Page } from './_page';

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
      flows={{ 'embedded-contextual-education2': 1 }}
    >
      <ChakraProvider>
        <Page />
      </ChakraProvider>
    </DoptProvider>
  );
}
