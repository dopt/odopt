import { PropsWithChildren } from 'react';
import { LoggerProps } from '@dopt/logger';
import { AssistantQueryParams } from '@dopt/ai-assistant-definition';

/**
 * Providing this configuration to the {@link DoptAiProvider} allows the
 * the SDK to fetch relevant data from the Dopt AI API.
 */
export interface AiProviderProps extends PropsWithChildren {
  /**
   * The userId for the currently active user on the page.
   */
  userId: string | undefined;
  /**
   * An optional groupId for that userId.
   */
  groupId?: string | undefined;
  /**
   * Your AI API key.
   */
  apiKey: string;
  environment?: string;

  /**
   * The underlying model you want answers generated with.
   * This parameter is currently ignored by the API.
   * It may be exposed in the future.
   */
  model?: AssistantQueryParams['model'];

  logLevel?: LoggerProps['logLevel'];
}
