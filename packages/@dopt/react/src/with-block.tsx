import type { Block } from '@dopt/block-types';
import { useBlock } from './use-block';

/**
 * A React HOC for accessing block state and methods corresponding
 * to an intent-based API for maniuplating said state.
 *
 * @example
 * ```tsx
 *  import { withDopt } from '@dopt/react';
 *  import { WelcomeModal } from './welcome-modal';
 *
 *  export function Application() {
 *    const WelcomeModalWithDopt = withDopt(WelcomeModal, 'j0zExxZDVKCPXPzB2ZgpW');
 *    return (
 *      <main>
 *        <WelcomeModalWithDopt />
 *      </main>
 *    );
 *  }
 * ```
 *
 * @param Component - the React component you with to inject Dopt props into
 * @param uid - {@link Block['uid']}
 * @returns The original component with {@link Block | block} and {@link BlockIntentions | intent}
 * props injected in
 *
 */
export function withBlock<T>(
  Component: React.ComponentType<T>,
  uid: Block['uid']
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: T) => {
    const [block, intent] = useBlock(uid);
    return <Component {...props} block={block} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withBlock(${displayName}, ${uid})`;

  return ComponentWithDopt;
}
