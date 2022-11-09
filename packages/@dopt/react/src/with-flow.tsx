import { DoptContext } from './context';

import { useFlow } from './use-flow';

export interface WithDoptProps extends DoptContext {}

/**
 * A React HOC for accessing flow state and methods corresponding
 * to an intent-based API for maniuplating said state.
 *
 * @example
 * ```tsx
 *  import { withFlow } from '@dopt/react';
 *  import { WelcomeModal } from './welcome-modal';
 *
 *  export function Application() {
 *    const WelcomeModalWithDopt = withFlow('new-user-onboarding', 1);
 *    return (
 *      <main>
 *        <WelcomeModalWithDopt />
 *      </main>
 *    );
 *  }
 * ```
 *
 * @param Component - the React component you with to inject Dopt props into
 * @param name - the flow identifier
 * @param version - the flow version
 * @returns The original component with {@link Flow | flow} and {@link FlowIntentions | intent}
 * props injected in
 *
 * @alpha
 */
export function withFlow<T>(
  Component: React.ComponentType<T>,
  ...useFlowArgs: Parameters<typeof useFlow>
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: Omit<T, keyof WithDoptProps>) => {
    const [flow, intent] = useFlow(...useFlowArgs);
    return <Component {...(props as T)} flow={flow} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withDopt(${displayName}, ${useFlowArgs.join(
    ', '
  )})`;

  return ComponentWithDopt;
}
