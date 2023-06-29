import { Modal } from '@dopt/semantic-data-layer-modal';
import { useBlock } from '@dopt/react';

import { transform } from './transform';

export function useModal(id: string): Modal {
  const [block, transition] = useBlock<['complete', 'dismiss']>(id);

  return transform({ block, transition });
}
