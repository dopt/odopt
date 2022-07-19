import { DoptContext } from './context';

import { useDopt } from './use-dopt';

export interface WithDoptProps extends DoptContext {}

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
