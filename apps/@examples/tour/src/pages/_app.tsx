import { DoptProvider } from '@dopt/react-old';
import { useIdentifyUser } from '@/hooks';

import 'react-loading-skeleton/dist/skeleton.css';

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
      flowVersions={{ tour: 2 }}
    >
      <Example />
    </DoptProvider>
  );
}
