import { ReactNode } from 'react';

export interface Block {
  readonly active: boolean;
  readonly completed: boolean;
  readonly started: boolean;
  readonly stopped: boolean;
  readonly exited: boolean;
  readonly uuid: string;
}

export interface Blocks {
  [identifier: string]: Block;
}

export interface Methods {
  /** @internal */
  get: (identifier: string) => void;
  start: (identifier: string) => void;
  /** @internal */
  complete: (identifier: string) => void;
  /** @internal */
  stop: (identifier: string) => void;
  /** @internal */
  exit: (identifier: string) => void;
}

export interface Mocks {
  blocks: Blocks;
}

export interface BaseProviderConfig {
  children?: ReactNode;
}

/**
 * Providing this configuration to the {@link DoptProvider} allows
 * for the {@link useDopt}Hook and {@link withDopt}HOC to fetch
 * relevant data from the Dopt API.
 */
export interface ProviderConfig extends BaseProviderConfig {
  userId: string;
  apiKey: string;
}

/**
 * Providing this configuration to the {@link MockDoptProvider} allows
 * for local/offline testing of Dopt in your product.
 */
export interface MockProviderConfig extends BaseProviderConfig {
  /**
   * A user provided javascript object for mocking {@link Blocks}
   */
  mocks?: Mocks;
}
