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
  userId: string | undefined;
  groupId?: string | undefined;
  apiKey: string;
  logLevel?: LoggerProps['logLevel'];
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
