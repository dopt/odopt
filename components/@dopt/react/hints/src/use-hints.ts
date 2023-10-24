import { Hints, HintsItem } from '@dopt/semantic-data-layer-hints';
import { useBlock, useContainer } from '@dopt/react';

import { transform, transformItem } from './transform';
import { useState } from 'react';

export function useHints(id: string): Hints {
  const container = useContainer(id);
  return transform(container);
}

export function useHintsItem(id: string): HintsItem & {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [block] = useBlock<['complete', 'dismiss']>(id);
  const container = useContainer(block?.containerUid || '');

  const [open, setOpen] = useState<boolean>(false);

  return {
    ...transformItem(block, transform(container)),
    open,
    setOpen,
  };
}
