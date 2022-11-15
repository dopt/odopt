import { useContext, useCallback } from 'react';
import { DoptContext } from './context';
import { useBlock, BlockIntentions } from './use-block';

import { Group } from '@dopt/javascript-common';

export interface GroupIntentions extends BlockIntentions {
  prev: () => void;
  next: () => void;
  goto: () => void;
}
const useGroup = (
  identifier: `group_${string}`
): [group: Group, intent: GroupIntentions] => {
  const { loading, blocks, blockIntentions } = useContext(DoptContext);

  const [, intents] = useBlock(identifier);

  const prev = useCallback(
    () => !loading && blockIntentions.prev(identifier),
    [loading, blockIntentions]
  );
  const next = useCallback(
    () => !loading && blockIntentions.next(identifier),
    [loading, blockIntentions]
  );
  const goto = useCallback(
    () => !loading && blockIntentions.goto(identifier),
    [loading, blockIntentions]
  );

  return [blocks[identifier] as Group, { prev, next, goto, ...intents }];
};

export { useGroup };
