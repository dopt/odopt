import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';

import { useMemo } from 'react';
import { nanoid } from 'nanoid';

import { GettingStartedChecklistExample } from '@/pages';

const theme = extendTheme({
  colors: {
    blue: {
      500: '#228BE6',
    },
  },
});

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
      flows={{ 'getting-started-checklist2': 1 }}
    >
      <ChakraProvider theme={theme}>
        <GettingStartedChecklistExample />
      </ChakraProvider>
    </DoptProvider>
  );
}
