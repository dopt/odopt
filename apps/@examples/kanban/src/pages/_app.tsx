import { useEffect } from 'react';

import { MantineProvider } from '@mantine/core';
import { DoptProvider } from '@dopt/react';

import { useIdentifyUser } from '@/hooks';

import { Kanban } from '@/pages';

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
      optimisticUpdates={false}
      userId={userId}
      flowVersions={{ kanban: 2 }}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Kanban />
      </MantineProvider>
    </DoptProvider>
  );
}
