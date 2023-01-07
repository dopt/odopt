import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { DoptProvider } from '@dopt/react';

import { useIdentifyUser } from '@/hooks';
import { GettingStartedChecklistExample } from '@/pages';

const theme = extendTheme({
  colors: {
    blue: {
      500: '#228BE6',
    },
  },
});

export function App() {
  const userId = useIdentifyUser({
    company: 'Dopt',
    role: 'admin',
    inTrial: true,
  });

  return (
    <DoptProvider
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      optimisticUpdates={false}
      userId={userId}
      flowVersions={{ 'getting-started-checklist': 2 }}
    >
      <ChakraProvider theme={theme}>
        <GettingStartedChecklistExample />
      </ChakraProvider>
    </DoptProvider>
  );
}
