import { Checklist } from '@dopt/semantic-data-layer-checklist';
import { useFlow } from '@dopt/react';

import { transform } from './transform';

export function useChecklist(block: string): Checklist {
  const [flow, methods] = useFlow(block);

  return transform({ flow, methods });
}
