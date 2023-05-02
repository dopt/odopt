import { DoptProvider } from '@dopt/react';
import { useIdentifyUser } from '@/hooks';
import App from './App';
import './index.css';

export default function Page() {
  const userId = useIdentifyUser({
    company: 'Dopt',
    role: 'admin',
    inTrial: true,
  });
  return (
    <DoptProvider
      apiKey={import.meta.env.VITE_DOPT_BLOCKS_API_KEY}
      userId={userId}
      flowVersions={{ 'onboarding-tutorial': 1 }}
    >
      <App />
    </DoptProvider>
  );
}
