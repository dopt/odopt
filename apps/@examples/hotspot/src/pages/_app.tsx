import { useEffect } from 'react';
import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@/hooks';

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
      flowVersions={{ hotspot: 1 }}
    >
      <>Hotspot Example</>
    </DoptProvider>
  );
}
