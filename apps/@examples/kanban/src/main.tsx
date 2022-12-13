import * as ReactDOM from 'react-dom/client';

/**
 * Import `IdentifyApi` and `Configuration` from the Dopt users SDK.
 */
import { IdentifyApi, Configuration } from '@dopt/users-javascript-client';

/**
 * Import the `DoptProvider` component from the Dopt React SDK.
 */
import { DoptProvider } from '@dopt/react';

import { MantineProvider } from '@mantine/core';
import { getUserId } from '@/utils/user';
import App from './app';

const userId = getUserId();

/**
 * Initialize the identify API from the Dopt users SDK and identify the
 * current user to Dopt. We can also pass through any user properties that
 * we may want to use for targeting. In this example, we're hardcoding
 * `company`, `role`, and `inTrial` properties for demonstration purposes.
 */
const doptUsersClient = new IdentifyApi(
  new Configuration({
    apiKey: import.meta.env.VITE_DOPT_USERS_API_KEY,
  })
);
doptUsersClient.identify(userId, {
  company: 'Dopt',
  role: 'admin',
  inTrial: true,
});

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
  <>
    {/**
     * Initialize Dopt by passing our blocks API key, the current user's ID,
     * and the flow versions we want to serve to the `DoptProvider`.
     */}
    <DoptProvider
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      userId={userId}
      flowVersions={{ kanban: 2 }}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </DoptProvider>
  </>
);
