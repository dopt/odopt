import { Card } from '@dopt/semantic-data-layer-card';
import { useBlock } from '@dopt/react';

import { transform } from './transform';

export function useCard(id: string): Card {
  const [block, transition] = useBlock<['complete', 'dismiss']>(id);

  return transform({ block, transition });
}
