import { Logger } from '@dopt/logger';
import { createContext } from 'react';

import type { Mercator } from '@dopt/mercator';
import type { Flow, Block } from '@dopt/block-types';
import {
  Flows,
  Blocks,
  BlockIntention,
  FlowIntention,
} from '@dopt/javascript-common';

/**
 * The context, which is partial accessible through either the
 * {@link useBlock} and {@link useFlow}  hooks or the
 * {@link withBlock} and {@link withFlow} HOCs
 */
type DoptContext = {
  loading: boolean;
  flows: Flows;
  flowBlocks: Mercator<[Flow['sid'], Flow['version']], Block['uid'][]>;
  flowIntention: FlowIntention;
  blocks: Blocks;
  blockIntention: BlockIntention;
  log: Logger;
};

const DoptContext = createContext<DoptContext>({} as DoptContext);

export { DoptContext };
