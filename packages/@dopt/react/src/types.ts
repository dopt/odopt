import { LoggerProps } from '@dopt/logger';
import { ReactNode } from 'react';

import type { Blocks } from '@dopt/javascript-common';

export interface Mocks {
  blocks: Blocks;
}

export interface BaseProviderConfig {
  children?: ReactNode;
}

/**
 * Providing this configuration to the {@link DoptProvider} allows
 * for the {@link useBlock} hook and {@link withBlock} HOC to fetch
 * relevant data from the Dopt blocks API.
 */
export interface ProviderConfig extends BaseProviderConfig {
  userId: string | undefined;
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  flowVersions: Record<string, number>;
}

/**
 * Providing this configuration to the {@link MockDoptProvider} allows
 * for local/offline testing of Dopt in your product.
 */
export interface MockProviderConfig extends BaseProviderConfig {
  /**
   * A user provided JavaScript object for mocking {@link Blocks}
   */
  mocks?: Mocks;
  logLevel?: LoggerProps['logLevel'];
}
