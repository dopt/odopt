import { useEffect } from 'react';
import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@/hooks';

import { Example } from '@/pages';

export function App() {
  const userId = useIdentifyUser({
    company: 'Dopt',
    role: 'admin',
    inTrial: true,
  });

  useEffect(() => {
    if (userId) {
      if (document.referrer !== '') {
        window.parent.postMessage(
          JSON.stringify({ userId }),
          document.referrer
        );
      }
    }
  }, [userId]);

  return (
    <DoptProvider
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      userId={userId}
      flowVersions={{ checklist: 3 }}
    >
      <Example />
    </DoptProvider>
  );
}
