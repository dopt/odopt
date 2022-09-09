import { DoptContext } from './context';

import { useDopt } from './use-dopt';

export interface WithDoptProps extends DoptContext {}

/**
 * A React HOC for accessing a Journey's Model Block State and
 * methods corresponding to an intent-based API for maniuplating
 * said state.
 *
 * @example
 * ```ts
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
 * @param Component - the React Component you with to inject Dopt props into
 * @param identifier - the "Reference Id" for some Journey Model Block
 * @returns ComponentWidthDopt - the original component with {@link Block | block} and {@link Methods | methods }
 * props injected in
 *
 *
 * @alpha
 */
export function withDopt<T>(
  Component: React.ComponentType<T>,
  identifier: string
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: Omit<T, keyof WithDoptProps>) => {
    const [block, methods] = useDopt(identifier);
    return <Component {...(props as T)} block={block} methods={methods} />;
  };

  ComponentWithDopt.displayName = `withDopt(${displayName}, ${identifier})`;

  return ComponentWithDopt;
}
