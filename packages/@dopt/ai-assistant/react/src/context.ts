import { Assistant } from '@dopt/ai-assistant-javascript';
import { Logger } from '@dopt/logger';
import { RefObject, createContext } from 'react';

type DoptAiContext = {
  logger: RefObject<Logger>;
  assistant: Assistant;
};

const DoptAiContext = createContext<DoptAiContext>({} as DoptAiContext);

export { DoptAiContext };
