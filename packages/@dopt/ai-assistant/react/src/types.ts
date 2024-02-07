import { PropsWithChildren } from 'react';
import { LoggerProps } from '@dopt/logger';

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

  logLevel?: LoggerProps['logLevel'];
}
