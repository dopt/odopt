import { useMemo } from 'react';
import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@dopt/react-users';
import { nanoid } from 'nanoid';

import { Example } from '@/pages/';

import { useChecklist } from '@dopt/react-checklist';

import './_app.css';

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
      flows={{
        'onboarding-hub': 0,
        'onboarding-hub-tour': 0,
        'onboarding-hub-video': 0,
      }}
    >
      <Example />
      <DemoHelper />
    </DoptProvider>
  );
}

function DemoHelper() {
  const checklist = useChecklist('onboarding-hub.getting-started-checklist');
  checklist.items.forEach((item) => {
    if (item.id !== 'onboarding-hub.invite-teammates' && !item.done) {
      item.complete();
    }
  });

  return <></>;
}
