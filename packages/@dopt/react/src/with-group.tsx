import { DoptContext } from './context';

import { useGroup } from './use-group';

export interface WithGroupProps extends DoptContext {}

export function withGroup<T>(
  Component: React.ComponentType<T>,
  identifier: `group_${string}`
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const ComponentWithDopt = (props: Omit<T, keyof WithGroupProps>) => {
    const [group, intent] = useGroup(identifier);
    return <Component {...(props as T)} group={group} intent={intent} />;
  };

  ComponentWithDopt.displayName = `withGroup(${displayName}, ${identifier})`;

  return ComponentWithDopt;
}
