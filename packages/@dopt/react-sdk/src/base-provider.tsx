import { MockProviderConfig, ProviderConfig } from './types';
import { MockDoptProvider } from './mock-provider';
import { DoptProvider } from './provider';
import { isMockProviderProps } from './utils';

/**
 * Returns the appropriate DoptProvider based on the props provided.
 *
 * @remarks
 * The BaseProvider (exposed as DoptProvder) can currently be configured
 * to support two distinct usages
 *
 * Offline/Local Development w/ {@link MockProviderConfig}
 * @example
 * ```ts
 * <DoptProvider mocks={{ blocks }}>{children}</DoptProvider>
 * ```
 *
 *
 * Usage against Dopt APIs w/ {@link ProviderConfig}
 * @example
 * ```ts
 * <DoptProvider userId={234519632} apiKey="1gp6xz725i">
 *  {children}
 * </DoptProvider>
 * ```
 *
 * Currently, offline/local development supports mocking individual
 * blocks. In all likelihood we will expand this usage to support
 * mocking blocks and edges to support local/offline development
 * that more closely mirrors API usage.
 *
 * @param props - {@link ProviderConfig} | {@link MockProviderConfig}
 * @returns props is {@link MockProviderConfig} ? {@link MockDoptProvider} : {@link DoptProvider}
 *
 * @alpha
 */
export function BaseDoptProvider(props: ProviderConfig | MockProviderConfig) {
  if (isMockProviderProps(props)) {
    return <MockDoptProvider {...props} />;
  } else {
    return <DoptProvider {...props} />;
  }
}
