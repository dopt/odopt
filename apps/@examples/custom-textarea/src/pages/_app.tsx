import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@/hooks';

import { Example } from '@/pages/';

export function App() {
  const userId = useIdentifyUser({
    company: 'Dopt',
    role: 'admin',
    inTrial: true,
  });

  return (
    <DoptProvider
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      userId={userId}
      flowVersions={{ 'custom-textarea': 2 }}
    >
      <Example />
    </DoptProvider>
  );
}
