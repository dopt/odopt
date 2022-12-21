import { MockProviderConfig, ProviderConfig } from './types';
import { MockDoptProvider } from './mock-provider';
import { ProdDoptProvider } from './provider';
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
 * ```tsx
 *  import { DoptProvider } from '@dopt/react';
 *  import Application from './application';
 *
 *  export function Index() {
 *    return (
 *      <DoptProvider
 *        userId={userId}
 *        apikey={blockAPIKey}
 *        flowVersions={{
 *          onboardingFlow: 3,
 *          upgradeFlow: 1
 *        }}
 *      >
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
 *  import { Mercator } from '@dopt/mercator';
 *  import Application from './application';
 *
 *  const blocks: Blocks = {
 *    'HNWvcT78tyTwygnbzU6SW': {
 *      kind: "block",
 *      type: "model",
 *      uid: 'HNWvcT78tyTwygnbzU6SW'
 *      sid: 'HNWvcT78tyTwygnbzU6SW',
 *      version: 1
 *      state: {
 *        completed: false;
 *        active: false;
 *      }
 *    },
 *  };
 *
 *  const flows: Flows = new Mercator()
 *  mercator.set(['new-user-onboarding', 1],  {
 *    kind: "flow",
 *    type: "flow",
 *    uid: '3489fnd9234j'
 *    sid: 'new-user-onboarding',
 *    version: 1
 *    state: {
 *      started: true;
 *      completed: false;
 *      exited: false;
 *    }
 *    blocks: Object.values(blocks)
 *  })
 *
 *
 *  export function Index() {
 *    return (
 *      <DoptProvider mocks={{ blocks, flows }}>
 *        <Application />
 *      </DoptProvider>
 *    );
 *  }
 * ```
 *
 *
 * @param props - {@link ProviderConfig} | {@link MockProviderConfig}
 * @returns props is {@link MockProviderConfig} ? {@link MockDoptProvider} : {@link ProdDoptProvider}
 *
 */
export function DoptProvider(
  props: ProviderConfig | MockProviderConfig
): ReturnType<typeof MockDoptProvider> | ReturnType<typeof ProdDoptProvider> {
  if (isMockProviderProps(props)) {
    return <MockDoptProvider {...props} />;
  } else {
    return <ProdDoptProvider {...props} />;
  }
}
