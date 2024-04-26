import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { DoptProvider } from '@dopt/react';
import { DOPT_FLOW_ID } from './const';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DoptProvider
      userId="$USER_ID"
      apiKey="$BLOCKS_API_KEY"
      flows={{ [DOPT_FLOW_ID]: 1 }}
    >
      <App />
    </DoptProvider>
  </React.StrictMode>
);
