import * as ReactDOM from 'react-dom/client';

import { StrictMode } from 'react';
import { DoptUsersProvider } from '@dopt/react-users';

import App from './App';
import './index.css';

const root = document.getElementById('root') as Element;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <DoptUsersProvider apiKey={import.meta.env.VITE_DOPT_USERS_API_KEY}>
      <App />
    </DoptUsersProvider>
  </StrictMode>
);
