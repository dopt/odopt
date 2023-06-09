import { Tour } from '@dopt/semantic-data-layer-tour';
import { useFlow } from '@dopt/react';

import { transform } from './transform';

export function useTour(block: string): Tour {
  const [flow, methods] = useFlow(block);

  return transform({ flow, methods });
}
