import * as ReactDOM from 'react-dom/client';

import { App } from './pages/_app';

import './global.css';

const root = document.getElementById('root') as Element;

ReactDOM.createRoot(root).render(<App />);
