import { MockProviderConfig, ProviderConfig } from './types';
export const PKG_VERSION = process.env.PKG_VERSION || '';
export const PKG_NAME = process.env.PKG_NAME || '';
/** @internal */
export function isMockProviderProps(
  props: ProviderConfig | MockProviderConfig
): props is MockProviderConfig {
  return !!(props as MockProviderConfig).mocks;
}

export function getBlockDefaultState(identifier: string) {
  return {
    active: false,
    completed: false,
    exited: false,
    started: false,
    stopped: false,
    uuid: identifier,
  };
}
