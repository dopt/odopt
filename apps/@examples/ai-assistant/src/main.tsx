import * as ReactDOM from 'react-dom/client';

import { App } from '@/pages/_app';
import { DoptUsersProvider } from '@dopt/react-users';

const root = document.getElementById('root') as Element;
ReactDOM.createRoot(root).render(
  <DoptUsersProvider apiKey={import.meta.env.VITE_DOPT_USERS_API_KEY}>
    <App />
  </DoptUsersProvider>
);
