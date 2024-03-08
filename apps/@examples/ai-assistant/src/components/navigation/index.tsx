import { navigation, navigationItem, subNavigationItem } from './index.css';

import {
  Connections,
  Engage,
  Home,
  Privacy,
  Protocols,
  Settings,
  Sparkles,
  Unify,
} from '../icon';
import { createTheme } from '@dopt/react-theme';

import { AIExplainEntry } from '../ai-explain-entry';

const theme = createTheme({
  colors: {
    primary: '#339AF0',
  },
});

export function Navigation() {
  return (
    <div className={navigation}>
      <div className={navigationItem}>
        <Home />
        Home
      </div>
      <div
        className={navigationItem}
        style={{
          color: 'rgb(82, 189, 149)',
          backgroundColor: 'rgba(71, 77, 102, 0.64)',
          boxShadow: 'rgb(82, 189, 149) 4px 0px 0px inset',
        }}
      >
        <Connections />
        Connections
      </div>
      <div className={subNavigationItem}>Sources</div>
      <div className={subNavigationItem}>Destinations</div>
      <div className={subNavigationItem}>Health</div>
      <div className={subNavigationItem}>Catalog</div>

      <div className={navigationItem}>
        <Privacy />
        Privacy
      </div>
      <div className={navigationItem}>
        <Protocols />
        Protocols
      </div>
      <div className={navigationItem}>
        <Unify />
        Unify
      </div>
      <div className={navigationItem}>
        <Engage />
        Engage
      </div>
      <div className={navigationItem}>
        <Settings />
        Settings
      </div>
      <div className={navigationItem}>
        <Sparkles />
        <AIExplainEntry />
      </div>
    </div>
  );
}
