import type { Set } from '@dopt/block-types';
import { DoptContext } from './context';
import { useOrderedGroup } from './use-ordered-group';

/**
 * A React HOC for accessing group block state and methods corresponding
 * to an intent-based API for manipulating said state.
 *
 * @example
 * ```tsx
 *  import { withOrderedGroup } from '@dopt/react';
 *  import { WelcomeModal } from './welcome-modal';
 *
 *  export function Application() {
 *    const WelcomeModalWithDopt = withOrderedGroup(WelcomeChecklist, 'j0zExxZDVKCPXPzB2ZgpW');
 *    return (
 *      <main>
 *        <WelcomeModalWithDopt />
 *      </main>
 *    );
 *  }
 * ```
 *
 * @param Component - the React component to inject Dopt props into
 * @param uid - {@link Set['uid']}
 * @returns The original component with {@link Set | set} and {@link BlockIntentions | intent}
 * props injected in
 *
 */
export function withOrderedGroup<T>(
  Component: React.ComponentType<T>,
  uid: Set['uid']
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: Omit<T, keyof DoptContext>) => {
    const [block, intent] = useOrderedGroup(uid);
    return <Component {...(props as T)} block={block} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withOrderedGroup(${displayName}, ${uid})`;

  return ComponentWithDopt;
}
