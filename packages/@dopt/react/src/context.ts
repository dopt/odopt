import { Logger } from '@dopt/logger';
import { createContext } from 'react';
import {
  Flows,
  Blocks,
  BlockIntentions,
  FlowIntentions,
} from '@dopt/javascript-common';

/**
 * The context accessible either through the {@link useBlock} and {@link useFlow}  hooks
 * or the {@link withBlock} and {@link withFlow} HOCs
 */
type DoptContext = {
  loading: boolean;
  flows: Flows;
  flowIntentions: FlowIntentions;
  blocks: Blocks;
  blockIntentions: BlockIntentions;
  log: Logger;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
