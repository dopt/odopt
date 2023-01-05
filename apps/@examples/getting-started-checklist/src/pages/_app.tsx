import { ChakraProvider } from '@chakra-ui/react';

import { DoptProvider } from '@dopt/react';

import { useIdentifyUser } from '@/hooks';
import { GettingStartedChecklistExample } from '@/pages';

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
      <ChakraProvider>
        <GettingStartedChecklistExample />
      </ChakraProvider>
    </DoptProvider>
  );
}
