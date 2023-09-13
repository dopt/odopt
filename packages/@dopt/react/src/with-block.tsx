import React from 'react';
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
 * @param id - one of {@link Block['sid']} | {@link Block['uid']}
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns The original component with {@link Block} and {@link BlockTransition}
 * injected as props.
 *
 */
export function withBlock<T>(Component: React.ComponentType<T>, id: string) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: T) => {
    const [block, intent] = useBlock(id);
    return <Component {...props} block={block} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withBlock(${displayName}, ${id})`;

  return ComponentWithDopt;
}
