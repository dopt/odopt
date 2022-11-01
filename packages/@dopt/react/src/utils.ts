import { MockProviderConfig, ProviderConfig } from './types';
export const PKG_VERSION = process.env.PKG_VERSION || '';
export const PKG_NAME = process.env.PKG_NAME || '';
export const URL_PREFIX = process.env.URL_PREFIX || '';
/** @internal */
export function isMockProviderProps(
  props: ProviderConfig | MockProviderConfig
): props is MockProviderConfig {
  return !!(props as MockProviderConfig).mocks;
}
