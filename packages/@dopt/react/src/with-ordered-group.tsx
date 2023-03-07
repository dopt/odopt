import type { Set } from '@dopt/block-types';
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
 * @param id - one of{@link Set['sid']} | {@link Set['uid']}
 * this param accepts either the user defined identifier (sid) or the system created identifier (the uid)
 * @returns The original component with {@link Set | set} and {@link BlockIntentions | intent}
 * props injected in
 *
 */
export function withOrderedGroup<T>(
  Component: React.ComponentType<T>,
  id: string
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: T) => {
    const [block, intent] = useOrderedGroup(id);
    return <Component {...props} block={block} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withOrderedGroup(${displayName}, ${id})`;

  return ComponentWithDopt;
}
