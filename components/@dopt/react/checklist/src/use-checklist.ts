import { Checklist, ChecklistItem } from '@dopt/semantic-data-layer-checklist';
import { useBlock, useContainer } from '@dopt/react';

import { transform, transformItem } from './transform';

export function useChecklist(id: string): Checklist {
  const container = useContainer(id);
  return transform(container);
}

export function useChecklistItem(id: string): ChecklistItem {
  const [block] = useBlock<['complete', 'skip']>(id);
  return transformItem(block);
}
