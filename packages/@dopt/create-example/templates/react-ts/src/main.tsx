import React from 'react';
import ReactDOM from 'react-dom/client';
import { DoptProvider } from '@dopt/react';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DoptProvider
      apiKey="$BLOCKS_API_KEY"
      userId="$USER_ID"
      flowVersions={{
        // prettier-ignore
        '$FLOW_ID': 1,
      }}
    >
      <App />
    </DoptProvider>
  </React.StrictMode>
);
