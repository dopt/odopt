import { Logger } from '@dopt/logger';
import { createContext } from 'react';

import type { Mercator } from '@dopt/mercator';
import type { Flow, Block, Field } from '@dopt/block-types';
import {
  FlowStatus,
  Flows,
  Blocks,
  BlockIntentHandler,
  FlowIntentHandler,
} from './types';

/**
 * The context stored within Dopt's provider. It is
 * partially accessible through hooks like
 * {@link useBlock} and {@link useFlow} or through
 * their HOCs like {@link withBlock} and {@link withFlow}.
 */
type DoptContext = {
  fetching: boolean;
  flows: Flows;
  flowBlocks: Mercator<[Flow['sid'], Flow['version']], Block['uid'][]>;
  flowStatuses: Record<Flow['uid'], FlowStatus>;
  flowIntention: FlowIntentHandler;
  blocks: Blocks;
  blockUidBySid: Map<Block['sid'], Block['uid']>;
  blockIntention: BlockIntentHandler;
  blockFields: Map<Block['uid'], Map<Field['sid'], Field>>;
  log: Logger;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
