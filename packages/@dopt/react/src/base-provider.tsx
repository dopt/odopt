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
 *
 * Using {@link ProviderConfig}
 * @example
 * ```ts
 *  import { DoptProvider } from '@dopt/react';
 *  import Application from './application';
 *
 *  export function Index() {
 *    return (
 *      <DoptProvider userId={userId} apikey={blockAPIKey}>
 *        <Application />
 *      </DoptProvider>
 *    );
 *  }
 * ```
 *
 * Using {@link MockProviderConfig}
 * @example
 * ```ts
 *  import { DoptProvider } from '@dopt/react';
 *  import Application from './application';
 *
 *  const blocks: Blocks = {
 *    'HNWvcT78tyTwygnbzU6SW': {
 *      active: true,
 *      started: false,
 *      completed: false,
 *      stopped: false,
 *      exited: false,
 *    },
 *  };
 *
 *  export function Index() {
 *    return (
 *      <DoptProvider mocks={{ blocks }}>
 *        <Application />
 *      </DoptProvider>
 *    );
 *  }
 * ```
 *
 *
 * @param props - {@link ProviderConfig} | {@link MockProviderConfig}
 * @returns props is {@link MockProviderConfig} ? {@link MockDoptProvider} : {@link DoptProvider}
 *
 * @alpha
 */
export function BaseDoptProvider(
  props: ProviderConfig | MockProviderConfig
): ReturnType<typeof MockDoptProvider> | ReturnType<typeof DoptProvider> {
  if (isMockProviderProps(props)) {
    return <MockDoptProvider {...props} />;
  } else {
    return <DoptProvider {...props} />;
  }
}
