import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@/hooks';

import { Home } from '@/pages';

import './_app.css';

export function App() {
  // Identify a dummy user to Dopt when the app loads
  const userId = useIdentifyUser({
    company: 'Dopt',
    role: 'admin',
    inTrial: true,
  });

  return (
    <DoptProvider
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      userId={userId}
      flowVersions={{ 'custom-modal-component': 1 }}
    >
      <Home />
    </DoptProvider>
  );
}
