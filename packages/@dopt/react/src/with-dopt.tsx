import { DoptContext } from './context';

import { Block } from './types';
import { useDopt, Intentions } from './use-dopt';

export interface WithDoptProps extends DoptContext {}

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
 * @param identifier - the reference ID for some step block
 * @returns The original component with {@link Block | block} and {@link Intentions | intent}
 * props injected in
 *
 * @alpha
 */
export function withDopt<T>(
  Component: React.ComponentType<T>,
  identifier: string
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: Omit<T, keyof WithDoptProps>) => {
    const [block, intent] = useDopt(identifier);
    return <Component {...(props as T)} block={block} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withDopt(${displayName}, ${identifier})`;

  return ComponentWithDopt;
}
