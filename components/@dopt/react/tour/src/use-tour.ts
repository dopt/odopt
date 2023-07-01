import { Tour, TourItem } from '@dopt/semantic-data-layer-tour';
import { useBlock, useContainer } from '@dopt/react';

import { transform, transformItem } from './transform';

export function useTour(id: string): Tour {
  const container = useContainer(id);
  return transform(container);
}

export function useTourItem(id: string): TourItem {
  const [block] = useBlock<['previous', 'next']>(id);
  const container = useContainer(block?.containerUid || '');

  return transformItem(block, transform(container));
}
