export { BaseDoptProvider as DoptProvider } from './base-provider';
export { DoptContext } from './context';
export { useBlock, useDopt } from './use-block';
export { withBlock, withDopt } from './with-block';

export { URL_PREFIX as BASE_URL } from './utils';

export type { Block, Blocks } from '@dopt/javascript-common';
export type { Intentions } from './use-block';
export type {
  Mocks,
  BaseProviderConfig,
  ProviderConfig,
  MockProviderConfig,
} from './types';
