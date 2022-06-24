import * as React from 'react';

export interface Block {
  /*readonly*/ active: boolean;
  /*readonly*/ finished?: boolean;
  /*readonly*/ started?: boolean;
  /*readonly*/ stopped?: boolean;
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
   * Sets `finished` to true.
   * Has the following side-effects
   * - `active` is set to false
   */
  finish: (identifier: string) => void;
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

export interface ProviderConfig {
  userId: string;
  apiKey: string;
  children: React.ReactNode;
}
