import React, { useRef, useEffect, useMemo } from 'react';

import { Logger } from '@dopt/logger';

import { DoptAiContext } from './context';

import { AiProviderProps } from './types';
import { Assistant } from '@dopt/ai-assistant-javascript';

export function DoptAiProvider({
  apiKey,
  children,
  environment,
  groupId,
  logLevel,
  userId,
  model,
}: AiProviderProps) {
  const assistant = useMemo<Assistant>(
    () =>
      new Assistant({
        apiKey,
        userId,
        groupId,
        environment,
        model,
      }),
    [apiKey, userId, groupId, environment, model]
  );

  /**
   * Create a ref around Logger so that
   * we can use it within hooks.
   */
  const logger = useRef<Logger>(new Logger({ logLevel }));

  useEffect(() => {
    logger.current = new Logger({ logLevel });
  }, [logLevel]);

  return (
    <DoptAiContext.Provider
      value={{
        logger,
        assistant,
      }}
    >
      {children}
    </DoptAiContext.Provider>
  );
}
