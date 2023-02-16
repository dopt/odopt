import { LoggerProps } from '@dopt/logger';
import { ReactNode } from 'react';

import type { Blocks, Flows } from '@dopt/javascript-common';

export interface Mocks {
  flows: Flows;
  blocks: Blocks;
}

export interface BaseProviderConfig {
  children?: ReactNode;
}

/**
 * Providing this configuration to the {@link DoptProvider} allows the
 * the SDK to fetch relevant data from the Dopt blocks API.
 */
export interface ProviderConfig extends BaseProviderConfig {
  /**
   * The userId you're fetching block and flows for.
   */
  userId: string | undefined;
  /**
   * An optional groupId for that userId.
   */
  groupId?: string | undefined;
  /**
   * Your blocks API key.
   */
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
  /**
   * An object containing all flows and versions you'd like to fetch.
   */
  flowVersions: Record<string, number>;
  optimisticUpdates?: boolean;
}

/**
 * Providing this configuration to the {@link MockDoptProvider} allows
 * for local/offline testing of Dopt in your product.
 */
export interface MockProviderConfig extends BaseProviderConfig {
  mocks?: Mocks;
  logLevel?: LoggerProps['logLevel'];
}
