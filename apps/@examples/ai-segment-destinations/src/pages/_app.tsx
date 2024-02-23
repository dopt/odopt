import { useMemo } from 'react';
import { useIdentifyUser } from '@dopt/react-users';
import { nanoid } from 'nanoid';

import ContextualAssistant from '@dopt/react-contextual-assistant';
import { DoptAiProvider } from '@dopt/ai-assistant-react';

import { Example } from '@/pages/';

import './_app.css';

export function App() {
  /**
   * Extract AI model (super secret)
   */
  const urlParams = new URLSearchParams(window.location.search);
  let model = urlParams.get('secretAI') ?? undefined;
  if (model !== 'gpt' && model !== 'gemini') {
    model = undefined;
  }

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
    <DoptAiProvider
      userId={userId}
      apiKey={import.meta.env.VITE_AI_EXTERNAL_API_KEY}
      model={model}
    >
      <ContextualAssistant.Provider assistant="ai-segment-destination">
        <ContextualAssistant.Highlight>
          <Example />
        </ContextualAssistant.Highlight>
      </ContextualAssistant.Provider>
    </DoptAiProvider>
  );
}
