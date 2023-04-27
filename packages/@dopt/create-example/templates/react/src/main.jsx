import React from 'react';
import ReactDOM from 'react-dom/client';
import { DoptProvider } from '@dopt/react';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DoptProvider
      apiKey="$BLOCKS_API_KEY"
      userId="$USER_ID"
      flowVersions={{
        $FLOW_ID: 1,
      }}
    >
      <App />
    </DoptProvider>
  </React.StrictMode>
);
