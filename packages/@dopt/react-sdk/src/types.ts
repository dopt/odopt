import { ReactNode } from 'react';

export interface Block {
  /*readonly*/ active: boolean;
  /*readonly*/ completed: boolean;
  /*readonly*/ started: boolean;
  /*readonly*/ stopped: boolean;
  /*readonly*/ exited: boolean;
  /*readonly*/ uuid: string;
}

export interface Blocks {
  [identifier: string]: Block;
}

export interface Methods {
  get: (identifier: string) => void;
  /*
   * Sets `started` to true iff `active` is true
   */
  start: (identifier: string) => void;
  /*
   * Sets `completed` to true.
   * Has the following side-effects
   * - `active` is set to false
   */
  complete: (identifier: string) => void;
  /*
   * Sets `stopped` to true.
   * Has the following side-effects
   * - `active` is set to false
   * - children nodes are not set to active (equivalent
   *   to stopping this path in the journey)
   */
  stop: (identifier: string) => void;
  /*
   * Sets `stopped` to true.
   * Has the following side-effects
   * - `active` is set to false
   * - stops all active paths in the journey.
   */
  exit: (identifier: string) => void;
}

export interface Mocks {
  blocks: Blocks;
}

export interface BaseProviderConfig {
  children?: ReactNode;
}

export interface ProviderConfig extends BaseProviderConfig {
  userId: string;
  apiKey: string;
}

export interface MockProviderConfig extends BaseProviderConfig {
  mocks?: Mocks;
}
